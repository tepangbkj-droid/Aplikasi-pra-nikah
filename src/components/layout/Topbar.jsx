import { Menu } from "lucide-react";

export default function Topbar({ title, subtitle, onOpenMobileNav }) {
  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-ink/5">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden p-2 -ml-2 rounded-lg hover:bg-rose"
          aria-label="Buka menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="font-display text-2xl text-ink">{title}</h1>
          {subtitle && (
            <p className="text-sm text-ink/50 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
}
