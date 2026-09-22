import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Coins,
  Store,
  PackageCheck,
  Wallet,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/checklist", label: "Checklist", icon: ListChecks },
  { to: "/emas", label: "Tabungan Emas", icon: Coins },
  { to: "/vendor", label: "Vendor", icon: Store },
  { to: "/barang", label: "Seserahan & Perabotan", icon: PackageCheck },
  { to: "/keuangan", label: "Tabungan & Pengeluaran", icon: Wallet },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-wine text-ivory min-h-screen sticky top-0">
      {/* Monogram */}
      <div className="px-7 pt-8 pb-6 border-b border-ivory/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full border border-gold-light/60 flex items-center justify-center">
            <span className="font-display text-lg text-gold-light">T&S</span>
          </div>
          <div>
            <p className="font-display text-lg leading-tight">Menuju Hari-H</p>
            <p className="text-[11px] text-ivory/50 tracking-wide">
              Tebby &amp; Shintya
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-ivory/10 text-ivory"
                  : "text-ivory/60 hover:text-ivory hover:bg-ivory/5",
              ].join(" ")
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer note */}
      <div className="px-7 py-5 border-t border-ivory/10">
        <p className="text-[11px] text-ivory/40 leading-relaxed">
          Persiapan pribadi, jangan bagikan tautan ini ke orang lain.
        </p>
      </div>
    </aside>
  );
}
