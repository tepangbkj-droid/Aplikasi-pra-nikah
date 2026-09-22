import { Wallet, ListChecks, ReceiptText } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { formatIDR } from "../utils/formatCurrency";
import SavingsProgressCard from "../components/dashboard/SavingsProgressCard";
import StatCard from "../components/dashboard/StatCard";
import GoldPriceWidget from "../components/dashboard/GoldPriceWidget";
import ProgressBar from "../components/ui/ProgressBar";

export default function Dashboard() {
  const { summary } = useAppContext();
  const {
    currentSavings,
    targetSavings,
    totalExpenses,
    availableFunds,
    daysLeft,
    checklistDone,
    checklistTotal,
  } = summary;

  const hasChecklist = checklistTotal > 0;

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
          value={formatIDR(totalExpenses)}
          caption="Terakumulasi sejak awal persiapan"
          icon={ReceiptText}
          tone="wine"
        />

        <StatCard
          label="SISA DANA TERSEDIA"
          value={formatIDR(availableFunds)}
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
            {hasChecklist ? `${checklistDone} / ${checklistTotal} tugas` : "Belum ada tugas"}
          </p>
          <ProgressBar
            value={checklistDone}
            max={hasChecklist ? checklistTotal : 1}
            color="wine"
            height="h-1.5"
          />
        </div>
      </div>
    </div>
  );
}
