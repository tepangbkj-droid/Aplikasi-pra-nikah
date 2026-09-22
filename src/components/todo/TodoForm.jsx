import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";

const CATEGORIES = ["Administrasi", "Vendor", "Busana", "Venue", "Lainnya"];

export default function TodoForm({ onAdd, submitting }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      category,
      dueDate: dueDate || null,
      done: false,
    });

    setTitle("");
    setDueDate("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl2 shadow-card p-5 flex flex-col md:flex-row gap-3"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tambah tugas baru, mis. Booking dekorasi"
        className="flex-1 px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm placeholder:text-ink/35 focus:border-wine outline-none"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm text-ink/70 focus:border-wine outline-none"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="px-3.5 py-2.5 rounded-lg border border-ink/10 text-sm text-ink/70 focus:border-wine outline-none"
      />

      <Button type="submit" disabled={submitting || !title.trim()}>
        <Plus size={16} />
        Tambah
      </Button>
    </form>
  );
}
