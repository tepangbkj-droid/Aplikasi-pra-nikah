import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";

const PEOPLE = ["Tebby", "Shintya"];

export default function SavingsForm({ onAdd, submitting }) {
  const [actor, setActor] = useState(PEOPLE[0]);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const valid = Number(amount) > 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid) return;

    onAdd({ actor, amount: Number(amount), note: note.trim() || null });
    setAmount("");
    setNote("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl2 shadow-card p-5">
      <p className="text-xs font-semibold text-sage mb-4">CATAT TABUNGAN MASUK</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <select
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          className="px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm text-ink/70 focus:border-sage outline-none"
        >
          {PEOPLE.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Nominal (Rp)"
          className="px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-sage outline-none"
        />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Catatan (opsional)"
          className="px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/30 focus:border-sage outline-none"
        />
        <Button
          type="submit"
          disabled={submitting || !valid}
          className="bg-sage hover:bg-sage/90"
        >
          <Plus size={16} />
          Simpan
        </Button>
      </div>
    </form>
  );
}
