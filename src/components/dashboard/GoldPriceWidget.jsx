import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { getCurrentGoldPrice } from "../../services/goldPriceApi";

function formatIDR(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function GoldPriceWidget() {
  const [state, setState] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    let cancelled = false;

    getCurrentGoldPrice()
      .then((data) => {
        if (!cancelled) setState({ loading: false, data, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ loading: false, data: null, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const { loading, data, error } = state;
  const isUp = data?.changePercent >= 0;

  return (
    <div className="bg-blush rounded-xl2 shadow-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gold-dark/80">
          HARGA EMAS HARI INI
        </p>
        <span className="text-[10px] text-ink/40">per gram, Antam</span>
      </div>

      {loading && (
        <div className="animate-pulse space-y-2">
          <div className="h-7 w-32 bg-gold/20 rounded" />
          <div className="h-3 w-20 bg-gold/15 rounded" />
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-ink/50">
          Gagal memuat harga emas. Coba lagi nanti.
        </p>
      )}

      {!loading && data && (
        <>
          <p className="font-display text-2xl text-gold-dark">
            {formatIDR(data.pricePerGram)}
          </p>
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              isUp ? "text-sage" : "text-wine"
            }`}
          >
            {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(data.changePercent).toFixed(2)}% dari kemarin
          </div>
        </>
      )}
    </div>
  );
}
