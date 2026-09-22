const VARIANTS = {
  primary: "bg-wine text-ivory hover:bg-wine-dark",
  outline: "border border-ink/15 text-ink hover:bg-rose",
  ghost: "text-ink/60 hover:bg-rose",
  danger: "text-wine hover:bg-wine/10",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        VARIANTS[variant] ?? VARIANTS.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
