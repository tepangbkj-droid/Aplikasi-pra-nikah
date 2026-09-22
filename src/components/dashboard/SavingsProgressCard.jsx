import ProgressBar from "../ui/ProgressBar";

function formatIDR(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function SavingsProgressCard({
  currentSavings = 0,
  targetSavings = 1,
  daysLeft = null,
}) {
  const pct = Math.min(100, (currentSavings / targetSavings) * 100);

  return (
    <div className="bg-wine text-ivory rounded-xl2 shadow-soft p-7 md:p-8 flex flex-col justify-between min-h-[220px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-ivory/50 tracking-wide">
            TARGET TABUNGAN
          </p>
          <p className="font-display text-3xl md:text-4xl mt-2">
            {formatIDR(currentSavings)}
          </p>
          <p className="text-sm text-ivory/60 mt-1">
            dari target {formatIDR(targetSavings)}
          </p>
        </div>
        {daysLeft !== null && (
          <div className="text-right shrink-0">
            <p className="font-display text-3xl text-gold-light">{daysLeft}</p>
            <p className="text-xs text-ivory/50">hari lagi</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <ProgressBar value={currentSavings} max={targetSavings} color="gold" height="h-2" />
        <p className="mt-2 text-xs text-ivory/50">{pct.toFixed(1)}% tercapai</p>
      </div>
    </div>
  );
}
