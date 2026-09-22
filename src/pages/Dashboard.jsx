import { Wallet, ListChecks, ReceiptText } from "lucide-react";
import SavingsProgressCard from "../components/dashboard/SavingsProgressCard";
import StatCard from "../components/dashboard/StatCard";
import GoldPriceWidget from "../components/dashboard/GoldPriceWidget";
import ProgressBar from "../components/ui/ProgressBar";

// TODO: ganti dengan data dari Firestore (useFirestore hook) setelah modul
// terkait selesai. Untuk sekarang pakai nilai contoh agar layout bisa dicek.
const MOCK_SUMMARY = {
  currentSavings: 42_500_000,
  targetSavings: 120_000_000,
  totalExpenses: 8_750_000,
  daysLeft: 214,
  checklistDone: 11,
  checklistTotal: 28,
};

export default function Dashboard() {
  const { currentSavings, targetSavings, totalExpenses, daysLeft, checklistDone, checklistTotal } =
    MOCK_SUMMARY;

  const checklistPct = (checklistDone / checklistTotal) * 100;

  return (
    <div className="space-y-6">
      {/* Baris atas: progress tabungan besar + widget emas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <SavingsProgressCard
            currentSavings={currentSavings}
            targetSavings={targetSavings}
            daysLeft={daysLeft}
          />
        </div>
        <GoldPriceWidget />
      </div>

      {/* Baris kedua: stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          label="TOTAL PENGELUARAN"
          value={new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(totalExpenses)}
          caption="Terakumulasi sejak awal persiapan"
          icon={ReceiptText}
          tone="wine"
        />

        <StatCard
          label="SISA DANA TERSEDIA"
          value={new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(currentSavings - totalExpenses)}
          caption="Tabungan dikurangi pengeluaran"
          icon={Wallet}
          tone="sage"
        />

        <div className="bg-white rounded-xl2 shadow-card p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-ink/45">PROGRESS CHECKLIST</p>
            <div className="w-8 h-8 rounded-full bg-rose flex items-center justify-center">
              <ListChecks size={15} className="text-wine" strokeWidth={2} />
            </div>
          </div>
          <p className="font-display text-2xl text-ink">
            {checklistDone} / {checklistTotal} tugas
          </p>
          <ProgressBar value={checklistDone} max={checklistTotal} color="wine" height="h-1.5" />
        </div>
      </div>
    </div>
  );
}
