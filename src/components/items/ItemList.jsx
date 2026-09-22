import { ExternalLink, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";

function ItemRow({ item, onTogglePurchased, onDelete }) {
  const { id, name, shopeeLink, category, purchased } = item;

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl shadow-card">
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${purchased ? "text-ink/40" : "text-ink"}`}>
          {name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge tone={category === "Seserahan" ? "wine" : "gold"}>{category}</Badge>
          {shopeeLink && (
            <a
              href={shopeeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-wine hover:underline"
            >
              Lihat di Shopee <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>

      <button
        onClick={() => onTogglePurchased(id, !purchased)}
        className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
          purchased ? "bg-sage/15 text-sage" : "bg-rose text-wine hover:bg-wine/10"
        }`}
      >
        {purchased ? "Sudah Dibeli" : "Belum Dibeli"}
      </button>

      <button
        onClick={() => onDelete(id)}
        aria-label="Hapus barang"
        className="p-2 text-ink/30 hover:text-wine rounded-lg hover:bg-rose shrink-0"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default function ItemList({ items, loading, onTogglePurchased, onDelete }) {
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
          Belum ada barang tercatat. Tambahkan seserahan atau perabotan pertama di atas.
        </p>
      </div>
    );
  }

  const belum = items.filter((i) => !i.purchased);
  const sudah = items.filter((i) => i.purchased);

  return (
    <div className="space-y-6">
      {belum.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-ink/40 px-1">BELUM DIBELI ({belum.length})</p>
          {belum.map((item) => (
            <ItemRow key={item.id} item={item} onTogglePurchased={onTogglePurchased} onDelete={onDelete} />
          ))}
        </div>
      )}

      {sudah.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-ink/40 px-1">SUDAH DIBELI ({sudah.length})</p>
          {sudah.map((item) => (
            <ItemRow key={item.id} item={item} onTogglePurchased={onTogglePurchased} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
