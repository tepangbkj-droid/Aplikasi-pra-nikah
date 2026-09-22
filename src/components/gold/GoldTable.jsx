import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { calculateGoldProfit, summarizeGoldEntries } from "../../utils/calculateGoldProfit";
import { formatIDR } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export default function GoldTable({ entries, loading, currentPrice, onDelete }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl2 shadow-card p-6 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 bg-ink/5 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl2 shadow-card p-10 text-center">
        <p className="text-sm text-ink/45">
          Belum ada catatan pembelian emas. Tambahkan transaksi pertama di atas.
        </p>
      </div>
    );
  }

  const summary = currentPrice ? summarizeGoldEntries(entries, currentPrice) : null;

  return (
    <div className="bg-white rounded-xl2 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink/40 border-b border-ink/5">
              <th className="px-5 py-3 font-semibold">Tanggal</th>
              <th className="px-5 py-3 font-semibold">Gramasi</th>
              <th className="px-5 py-3 font-semibold">Harga Beli/gr</th>
              <th className="px-5 py-3 font-semibold">Nilai Sekarang</th>
              <th className="px-5 py-3 font-semibold">Profit/Loss</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const result = currentPrice
                ? calculateGoldProfit(currentPrice, entry.buyPrice, entry.grams)
                : null;

              return (
                <tr key={entry.id} className="border-b border-ink/5 last:border-0">
                  <td className="px-5 py-3.5 text-ink/70">{formatDate(entry.date)}</td>
                  <td className="px-5 py-3.5 text-ink/70">{entry.grams} gr</td>
                  <td className="px-5 py-3.5 text-ink/70">{formatIDR(entry.buyPrice)}</td>
                  <td className="px-5 py-3.5 text-ink/70">
                    {result ? formatIDR(result.currentValue) : "-"}
                  </td>
                  <td className="px-5 py-3.5">
                    {result && (
                      <div
                        className={`flex items-center gap-1 font-medium ${
                          result.isProfit ? "text-sage" : "text-wine"
                        }`}
                      >
                        {result.isProfit ? (
                          <TrendingUp size={14} />
                        ) : (
                          <TrendingDown size={14} />
                        )}
                        {formatIDR(result.profitNominal, { withSign: true })}
                        <span className="text-xs opacity-70">
                          ({result.profitPercent.toFixed(1)}%)
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => onDelete(entry.id)}
                      aria-label="Hapus entri"
                      className="p-1.5 text-ink/30 hover:text-wine rounded-lg hover:bg-rose"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {summary && (
            <tfoot>
              <tr className="bg-blush/60">
                <td colSpan={2} className="px-5 py-3.5 font-semibold text-ink/70">
                  Total ({summary.totalGrams.toFixed(2)} gr)
                </td>
                <td className="px-5 py-3.5 font-semibold text-ink/70">
                  {formatIDR(summary.totalCost)}
                </td>
                <td className="px-5 py-3.5 font-semibold text-ink/70">
                  {formatIDR(summary.totalValue)}
                </td>
                <td
                  className={`px-5 py-3.5 font-semibold ${
                    summary.totalProfit >= 0 ? "text-sage" : "text-wine"
                  }`}
                >
                  {formatIDR(summary.totalProfit, { withSign: true })}
                </td>
                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
