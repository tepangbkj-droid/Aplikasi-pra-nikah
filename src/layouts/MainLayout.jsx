import { useState } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { X } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const PAGE_META = {
  "/": { title: "Dashboard", subtitle: "Ringkasan persiapan pernikahan" },
  "/checklist": { title: "Checklist", subtitle: "Daftar tugas persiapan" },
  "/emas": { title: "Tabungan Emas", subtitle: "Pantau nilai emas Anda" },
  "/vendor": { title: "Vendor", subtitle: "Daftar vendor pilihan" },
  "/barang": { title: "Seserahan & Perabotan", subtitle: "Status pembelian barang" },
  "/keuangan": { title: "Tabungan & Pengeluaran", subtitle: "Arus kas persiapan nikah" },
};

export default function MainLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const meta = PAGE_META[location.pathname] ?? { title: "Menuju Hari-H" };

  return (
    <div className="flex min-h-screen bg-ivory">
      <Sidebar />

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-72 bg-wine text-ivory h-full p-6 flex flex-col">
            <button
              onClick={() => setMobileNavOpen(false)}
              className="self-end p-2 -mr-2 mb-4 text-ivory/70"
              aria-label="Tutup menu"
            >
              <X size={20} />
            </button>
            <p className="font-display text-lg mb-6">Menuju Hari-H</p>
            <nav className="space-y-1">
              {Object.entries(PAGE_META).map(([to, { title }]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    [
                      "block px-3.5 py-2.5 rounded-lg text-sm font-medium",
                      isActive ? "bg-ivory/10 text-ivory" : "text-ivory/60",
                    ].join(" ")
                  }
                >
                  {title}
                </NavLink>
              ))}
            </nav>
          </div>
          <div
            className="flex-1 bg-ink/40"
            onClick={() => setMobileNavOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
        <main className="flex-1 px-6 md:px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
