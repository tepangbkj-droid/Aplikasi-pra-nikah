export default function ProgressBar({
  value = 0,
  max = 100,
  color = "wine",
  height = "h-2.5",
  showLabel = false,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const colorMap = {
    wine: "bg-wine",
    gold: "bg-gold",
    sage: "bg-sage",
  };

  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-rose rounded-full overflow-hidden`}>
        <div
          className={`${height} ${colorMap[color] ?? colorMap.wine} rounded-full transition-[width] duration-500 ease-out`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <p className="mt-1.5 text-xs text-ink/60 font-medium">
          {pct.toFixed(0)}% tercapai
        </p>
      )}
    </div>
  );
}
