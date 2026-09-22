import { Trash2, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import Badge from "../ui/Badge";
import { formatIDR } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

/**
 * Menggabungkan riwayat tabungan (uang masuk) dan pengeluaran (uang keluar)
 * jadi satu tabel kronologis, supaya terlihat jelas bagaimana tiap transaksi
 * memotong atau menambah total dana yang tersedia.
 */
export default function ExpenseTable({ savings, expenses, loading, onDeleteSaving, onDeleteExpense }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl2 shadow-card p-6 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 bg-ink/5 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  const merged = [
    ...savings.map((s) => ({ ...s, kind: "savings" })),
    ...expenses.map((e) => ({ ...e, kind: "expense" })),
  ].sort((a, b) => {
    const aDate = a.createdAt?.toMillis?.() ?? 0;
    const bDate = b.createdAt?.toMillis?.() ?? 0;
    return bDate - aDate;
  });

  if (merged.length === 0) {
    return (
      <div className="bg-white rounded-xl2 shadow-card p-10 text-center">
        <p className="text-sm text-ink/45">Belum ada riwayat tabungan maupun pengeluaran.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl2 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink/40 border-b border-ink/5">
              <th className="px-5 py-3 font-semibold">Tanggal</th>
              <th className="px-5 py-3 font-semibold">Jenis</th>
              <th className="px-5 py-3 font-semibold">Keterangan</th>
              <th className="px-5 py-3 font-semibold">Catatan</th>
              <th className="px-5 py-3 font-semibold text-right">Nominal</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {merged.map((row) => {
              const isSaving = row.kind === "savings";
              return (
                <tr key={`${row.kind}-${row.id}`} className="border-b border-ink/5 last:border-0">
                  <td className="px-5 py-3.5 text-ink/60">{formatDate(row.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={isSaving ? "sage" : "wine"}>
                      {isSaving ? "Tabungan" : "Pengeluaran"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-ink">{isSaving ? row.actor : row.item}</td>
                  <td className="px-5 py-3.5 text-ink/50">{row.note || "-"}</td>
                  <td
                    className={`px-5 py-3.5 text-right font-medium flex items-center justify-end gap-1 ${
                      isSaving ? "text-sage" : "text-wine"
                    }`}
                  >
                    {isSaving ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                    {formatIDR(isSaving ? row.amount : -row.amount, { withSign: true })}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => (isSaving ? onDeleteSaving(row.id) : onDeleteExpense(row.id))}
                      aria-label="Hapus transaksi"
                      className="p-1.5 text-ink/30 hover:text-wine rounded-lg hover:bg-rose"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
