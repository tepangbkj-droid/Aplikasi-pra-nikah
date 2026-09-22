import TodoItem from "./TodoItem";

export default function TodoList({ items, loading, onToggle, onDelete }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-white rounded-xl shadow-card animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl2 shadow-card p-10 text-center">
        <p className="text-sm text-ink/45">
          Belum ada tugas. Tambahkan tugas pertama di atas untuk mulai merencanakan.
        </p>
      </div>
    );
  }

  const pending = items.filter((i) => !i.done);
  const done = items.filter((i) => i.done);

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-ink/40 px-1">
            BELUM SELESAI ({pending.length})
          </p>
          {pending.map((item) => (
            <TodoItem key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </div>
      )}

      {done.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-ink/40 px-1">SELESAI ({done.length})</p>
          {done.map((item) => (
            <TodoItem key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
