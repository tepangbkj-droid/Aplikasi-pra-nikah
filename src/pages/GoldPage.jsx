import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";
import { getCurrentGoldPrice } from "../services/goldPriceApi";
import { formatIDR } from "../utils/formatCurrency";
import GoldForm from "../components/gold/GoldForm";
import GoldTable from "../components/gold/GoldTable";

export default function GoldPage() {
  const { items, loading, add, remove } = useFirestore("goldEntries", { orderByField: "date" });
  const [submitting, setSubmitting] = useState(false);
  const [priceState, setPriceState] = useState({ loading: true, price: null, error: null });

  async function loadPrice() {
    setPriceState((s) => ({ ...s, loading: true }));
    try {
      const data = await getCurrentGoldPrice();
      setPriceState({ loading: false, price: data.pricePerGram, error: null });
    } catch (err) {
      setPriceState({ loading: false, price: null, error: err.message });
    }
  }

  useEffect(() => {
    loadPrice();
  }, []);

  async function handleAdd(data) {
    setSubmitting(true);
    try {
      await add(data);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Harga acuan saat ini */}
      <div className="bg-blush rounded-xl2 shadow-card p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gold-dark/80">HARGA ACUAN SAAT INI</p>
          <p className="font-display text-2xl text-gold-dark mt-1">
            {priceState.loading
              ? "Memuat..."
              : priceState.price
              ? `${formatIDR(priceState.price)} / gram`
              : "Gagal memuat"}
          </p>
        </div>
        <button
          onClick={loadPrice}
          className="p-2.5 rounded-lg hover:bg-gold/10 text-gold-dark"
          aria-label="Muat ulang harga"
        >
          <RefreshCw size={18} className={priceState.loading ? "animate-spin" : ""} />
        </button>
      </div>

      <GoldForm onAdd={handleAdd} submitting={submitting} />

      <GoldTable
        entries={items}
        loading={loading}
        currentPrice={priceState.price}
        onDelete={remove}
      />
    </div>
  );
}
