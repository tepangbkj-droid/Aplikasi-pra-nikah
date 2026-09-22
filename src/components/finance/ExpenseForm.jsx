import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";

export default function ExpenseForm({ onAdd, submitting }) {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const valid = item.trim() && Number(amount) > 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid) return;

    onAdd({ item: item.trim(), amount: Number(amount), note: note.trim() || null });
    setItem("");
    setAmount("");
    setNote("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl2 shadow-card p-5">
      <p className="text-xs font-semibold text-wine mb-4">CATAT PENGELUARAN</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Untuk apa, mis. DP Katering"
          className="px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-wine outline-none"
        />
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Nominal (Rp)"
          className="px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-wine outline-none"
        />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Catatan (opsional)"
          className="px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-wine outline-none"
        />
        <Button type="submit" disabled={submitting || !valid}>
          <Plus size={16} />
          Simpan
        </Button>
      </div>
    </form>
  );
}
