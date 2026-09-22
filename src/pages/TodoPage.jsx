import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { notifyTelegram, buildChecklistMessage } from "../services/telegramBot";
import TodoForm from "../components/todo/TodoForm";
import TodoList from "../components/todo/TodoList";
import ProgressBar from "../components/ui/ProgressBar";

export default function TodoPage() {
  const { items, loading, add, update, remove } = useFirestore("checklist");
  const [submitting, setSubmitting] = useState(false);

  const doneCount = items.filter((i) => i.done).length;

  async function handleAdd(data) {
    setSubmitting(true);
    try {
      await add(data);
      // Kirim notifikasi ke grup Telegram setiap kali tugas baru ditambahkan.
      notifyTelegram(buildChecklistMessage({ title: data.title }));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggle(id, done) {
    const item = items.find((i) => i.id === id);
    await update(id, { done });
    if (done && item) {
      notifyTelegram(buildChecklistMessage({ title: `${item.title} ✔️ selesai` }));
    }
  }

  async function handleDelete(id) {
    await remove(id);
  }

  return (
    <div className="space-y-6">
      {items.length > 0 && (
        <div className="bg-white rounded-xl2 shadow-card p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-ink/70">
              {doneCount} dari {items.length} tugas selesai
            </p>
            <p className="text-xs text-ink/40">
              {Math.round((doneCount / items.length) * 100)}%
            </p>
          </div>
          <ProgressBar value={doneCount} max={items.length} color="sage" height="h-1.5" />
        </div>
      )}

      <TodoForm onAdd={handleAdd} submitting={submitting} />

      <TodoList items={items} loading={loading} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
