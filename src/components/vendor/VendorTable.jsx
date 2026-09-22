import { ExternalLink, MessageCircle, Trash2 } from "lucide-react";
import { formatIDR } from "../../utils/formatCurrency";

export default function VendorTable({ vendors, loading, onDelete }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl2 shadow-card p-6 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 bg-ink/5 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="bg-white rounded-xl2 shadow-card p-10 text-center">
        <p className="text-sm text-ink/45">
          Belum ada vendor tersimpan. Tambahkan vendor pertama di atas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl2 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink/40 border-b border-ink/5">
              <th className="px-5 py-3 font-semibold">Nama Vendor</th>
              <th className="px-5 py-3 font-semibold">Link</th>
              <th className="px-5 py-3 font-semibold">WhatsApp</th>
              <th className="px-5 py-3 font-semibold">Harga</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id} className="border-b border-ink/5 last:border-0">
                <td className="px-5 py-3.5 font-medium text-ink">{v.name}</td>
                <td className="px-5 py-3.5">
                  {v.link ? (
                    <a
                      href={v.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-wine hover:underline"
                    >
                      Kunjungi <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span className="text-ink/30">-</span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <a
                    href={`https://wa.me/${v.waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sage font-medium hover:underline"
                  >
                    <MessageCircle size={14} />
                    Chat
                  </a>
                </td>
                <td className="px-5 py-3.5 text-ink/70">{formatIDR(v.price)}</td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    onClick={() => onDelete(v.id)}
                    aria-label="Hapus vendor"
                    className="p-1.5 text-ink/30 hover:text-wine rounded-lg hover:bg-rose"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
