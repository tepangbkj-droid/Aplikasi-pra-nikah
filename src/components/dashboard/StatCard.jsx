export default function StatCard({ label, value, caption, icon: Icon, tone = "ink" }) {
  const toneMap = {
    ink: "text-ink",
    wine: "text-wine",
    gold: "text-gold-dark",
    sage: "text-sage",
  };

  return (
    <div className="bg-white rounded-xl2 shadow-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-ink/45">{label}</p>
        {Icon && (
          <div className="w-8 h-8 rounded-full bg-rose flex items-center justify-center">
            <Icon size={15} className={toneMap[tone]} strokeWidth={2} />
          </div>
        )}
      </div>
      <p className={`font-display text-2xl ${toneMap[tone]}`}>{value}</p>
      {caption && <p className="text-xs text-ink/45 -mt-1">{caption}</p>}
    </div>
  );
}
