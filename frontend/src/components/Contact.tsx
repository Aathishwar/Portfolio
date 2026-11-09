import { clsx } from "clsx";
import { Check, Copy, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";
import { ChatIcon, GitHubIcon, LinkedInIcon, SectionHeading, shell } from "./ui";

// EmailJS public identifiers (safe to ship; restrict allowed origins in the EmailJS dashboard).
const EMAILJS = {
  service: "service_bxusdmd",
  toOwner: "template_xdg1c6k",
  autoReply: "template_93a6bsg",
  publicKey: "fupMbIv62n8CAmb_T",
};

// The WhatsApp number is stored shifted and only decoded on click, so it never shows
// in a link preview, the status bar on hover, or the page's text.
const WA = [64, 56, 63, 55, 62, 57, 57, 57, 57, 58, 64, 60];
const openWhatsApp = () => {
  const number = String.fromCharCode(...WA.map((c) => c - 7));
  window.open(`https://wa.me/${number}`, "_blank", "noopener,noreferrer");
};

type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const field =
  "w-full rounded-[10px] border border-field-line bg-bg px-4 py-3 text-[15px] text-fg placeholder:text-faint transition-colors focus:border-accent-text focus:outline-none";

function autoReplyText(name: string, message: string) {
  return `Hi ${name},

Thanks for reaching out. I've received your message and will reply within two days.

Your message:
${message}

Meanwhile, you can find my work at ${window.location.origin} and connect with me on LinkedIn: ${profile.links.linkedin}

Best regards,
${profile.fullName}
${profile.role}

This is an automated reply.`;
}

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Honeypot: real people never see or fill this field.
    if (data.get("company")) {
      setStatus({ kind: "sent", message: "Message sent." });
      form.reset();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      // Loaded on first send only, so the library never weighs on page load.
      const { default: emailjs } = await import("@emailjs/browser");
      await Promise.all([
        emailjs.send(EMAILJS.service, EMAILJS.toOwner, { from_name: name, from_email: email, message, to_name: "Aathishwar" }, EMAILJS.publicKey),
        emailjs.send(
          EMAILJS.service,
          EMAILJS.autoReply,
          { to_name: name, to_email: email, from_name: profile.fullName, reply_message: autoReplyText(name, message) },
          EMAILJS.publicKey,
        ),
      ]);
      setStatus({ kind: "sent", message: "Message sent. A confirmation is on its way to your inbox." });
      form.reset();
    } catch {
      setStatus({ kind: "error", message: `Couldn't send that. Email me directly at ${profile.email}.` });
    }
  };

  const linkRow = "flex items-center justify-between gap-4 border-b border-line py-4 text-[15px] transition-colors hover:text-accent-text";

  return (
    <section id="contact" className="pt-20 pb-24 md:pt-28 md:pb-32">
      <div className={shell}>
        <SectionHeading index="05" title="Contact" kicker="Open to AI, security and automation work. I reply within two days." />

        <div className="grid gap-14 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-8">
            <Reveal as="p" className="font-mono text-sm text-muted">
              <span className="text-accent-text">$</span> contact --now
            </Reveal>
            <Reveal variant="redact" delay={150} className="self-start">
              <a
                href={`mailto:${profile.email}`}
                className="font-display text-[clamp(22px,2.4vw,34px)] leading-tight font-semibold tracking-[-0.03em] [overflow-wrap:anywhere] transition-colors hover:text-accent-text"
              >
                {profile.email}
              </a>
            </Reveal>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-11 items-center gap-2 self-start rounded-[10px] border border-line-strong px-4 font-mono text-[13px] transition-colors hover:border-fg"
            >
              {copied ? <Check className="size-4 text-accent-text" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
              {copied ? "copied" : "copy email"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied" : ""}
            </span>

            <ul className="border-t border-line">
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={linkRow}>
                  <span className="flex items-center gap-3">
                    <LinkedInIcon className="size-[18px]" /> LinkedIn
                  </span>
                  <span className="font-mono text-xs text-muted">/in/aathishwar-v ↗</span>
                </a>
              </li>
              <li>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={linkRow}>
                  <span className="flex items-center gap-3">
                    <GitHubIcon className="size-[18px]" /> GitHub
                  </span>
                  <span className="font-mono text-xs text-muted">@Aathishwar ↗</span>
                </a>
              </li>
              <li>
                <button type="button" onClick={openWhatsApp} className={clsx(linkRow, "w-full text-left")}>
                  <span className="flex items-center gap-3">
                    <ChatIcon className="size-[18px]" /> WhatsApp
                  </span>
                  <span className="font-mono text-xs text-muted">opens chat ↗</span>
                </button>
              </li>
            </ul>
            <p className="font-mono text-xs text-muted">{profile.location} · IST (UTC+5:30)</p>
          </div>

          <Reveal variant="pixel" cols={10} rows={8} className="rounded-2xl">
            <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold">Send a message</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Name
                  <input name="name" required autoComplete="name" maxLength={80} className={field} />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Email
                  <input name="email" type="email" required autoComplete="email" maxLength={120} className={field} />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Message
                <textarea name="message" required rows={6} maxLength={4000} className={clsx(field, "resize-y")} />
              </label>
              <label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-accent px-5 text-[15px] font-semibold text-accent-fg transition-[transform,opacity] active:scale-[0.98] disabled:opacity-60"
              >
                <Send className="size-4" aria-hidden="true" />
                {status.kind === "sending" ? "Sending…" : "Send message"}
              </button>
              <p
                role="status"
                className={clsx("min-h-5 font-mono text-[13px]", status.kind === "error" ? "text-fg" : "text-accent-text")}
              >
                {status.kind === "error" && <span className="text-accent-text">! </span>}
                {status.message}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
