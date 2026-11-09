import { clsx } from "clsx";
import { profile } from "@/data/profile";
import { shell } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className={clsx(shell, "flex flex-col gap-3 py-10 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between")}>
        <p>
          © {new Date().getFullYear()} {profile.fullName} · {profile.location}
        </p>
        <p>
          React · Tailwind · Cloudflare <span className="text-faint">— click anywhere</span>
        </p>
      </div>
    </footer>
  );
}
