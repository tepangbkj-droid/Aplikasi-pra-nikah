import { Check, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";
import { formatDate } from "../../utils/formatDate";

export default function TodoItem({ item, onToggle, onDelete }) {
  const { id, title, category, dueDate, done } = item;

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl shadow-card">
      <button
        onClick={() => onToggle(id, !done)}
        aria-label={done ? "Tandai belum selesai" : "Tandai selesai"}
        className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
          done ? "bg-sage border-sage" : "border-ink/20 hover:border-wine"
        }`}
      >
        {done && <Check size={13} className="text-white" strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${done ? "line-through text-ink/35" : "text-ink"}`}>
          {title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge tone={done ? "sage" : "wine"}>{category}</Badge>
          {dueDate && <span className="text-xs text-ink/40">Target: {formatDate(dueDate)}</span>}
        </div>
      </div>

      <button
        onClick={() => onDelete(id)}
        aria-label="Hapus tugas"
        className="p-2 text-ink/30 hover:text-wine rounded-lg hover:bg-rose shrink-0"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
