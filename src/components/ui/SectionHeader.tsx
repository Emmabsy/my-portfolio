interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  className?: string;
}

export function SectionHeader({ label, title, className }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${className ?? ""}`}>
      <span className="mb-3 block font-mono text-[10px] uppercase tracking-[4px] text-indigo">
        {label}
      </span>
      <h2 className="font-serif text-[clamp(28px,5vw,44px)] font-bold leading-[1.08] tracking-tight" style={{ color: "var(--text)" }}>
        {title}
      </h2>
    </div>
  );
}
