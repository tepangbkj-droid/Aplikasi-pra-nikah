const TONE_MAP = {
  wine: "bg-wine/10 text-wine",
  gold: "bg-gold/15 text-gold-dark",
  sage: "bg-sage/15 text-sage",
  neutral: "bg-ink/5 text-ink/50",
};

export default function Badge({ children, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        TONE_MAP[tone] ?? TONE_MAP.neutral
      }`}
    >
      {children}
    </span>
  );
}
