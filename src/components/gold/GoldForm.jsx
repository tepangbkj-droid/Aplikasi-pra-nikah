import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";

const today = () => new Date().toISOString().slice(0, 10);

export default function GoldForm({ onAdd, submitting }) {
  const [date, setDate] = useState(today());
  const [buyPrice, setBuyPrice] = useState("");
  const [grams, setGrams] = useState("");

  const valid = date && Number(buyPrice) > 0 && Number(grams) > 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid) return;

    onAdd({
      date,
      buyPrice: Number(buyPrice),
      grams: Number(grams),
    });

    setBuyPrice("");
    setGrams("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl2 shadow-card p-5">
      <p className="text-xs font-semibold text-ink/40 mb-4">CATAT PEMBELIAN EMAS</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs text-ink/50 mb-1.5">Tanggal Beli</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={today()}
            className="w-full px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm focus:border-gold outline-none"
          />
        </div>

        <div>
          <label className="block text-xs text-ink/50 mb-1.5">Harga Beli / gram (Rp)</label>
          <input
            type="number"
            min="0"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="1900000"
            className="w-full px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-gold outline-none"
          />
        </div>

        <div>
          <label className="block text-xs text-ink/50 mb-1.5">Gramasi (gram)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            placeholder="5"
            className="w-full px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-gold outline-none"
          />
        </div>

        <div className="flex items-end">
          <Button
            type="submit"
            disabled={submitting || !valid}
            className="w-full bg-gold-dark hover:bg-gold-dark/90"
          >
            <Plus size={16} />
            Tambah
          </Button>
        </div>
      </div>
    </form>
  );
}
