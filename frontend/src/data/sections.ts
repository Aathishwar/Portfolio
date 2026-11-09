export const sections = [
  { id: "top", label: "intro" },
  { id: "experience", label: "experience" },
  { id: "work", label: "work" },
  { id: "stack", label: "stack" },
  { id: "credentials", label: "credentials" },
  { id: "contact", label: "contact" },
] as const;

export const sectionIds = sections.map((s) => s.id);
