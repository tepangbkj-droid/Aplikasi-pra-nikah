import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { notifyTelegram, buildSavingsMessage, buildExpenseMessage } from "../services/telegramBot";
import { formatIDR } from "../utils/formatCurrency";
import SavingsForm from "../components/finance/SavingsForm";
import ExpenseForm from "../components/finance/ExpenseForm";
import ExpenseTable from "../components/finance/ExpenseTable";

export default function FinancePage() {
  const savingsQuery = useFirestore("savings");
  const expensesQuery = useFirestore("expenses");
  const [submitting, setSubmitting] = useState(false);

  const totalSavings = savingsQuery.items.reduce((sum, s) => sum + Number(s.amount), 0);
  const totalExpenses = expensesQuery.items.reduce((sum, e) => sum + Number(e.amount), 0);
  const available = totalSavings - totalExpenses;

  async function handleAddSaving(data) {
    setSubmitting(true);
    try {
      await savingsQuery.add(data);
      notifyTelegram(buildSavingsMessage(data));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleAddExpense(data) {
    setSubmitting(true);
    try {
      await expensesQuery.add(data);
      notifyTelegram(buildExpenseMessage(data));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Ringkasan dana tersedia */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl2 shadow-card p-5">
          <p className="text-xs font-semibold text-ink/40">TOTAL TABUNGAN</p>
          <p className="font-display text-2xl text-sage mt-2">{formatIDR(totalSavings)}</p>
        </div>
        <div className="bg-white rounded-xl2 shadow-card p-5">
          <p className="text-xs font-semibold text-ink/40">TOTAL PENGELUARAN</p>
          <p className="font-display text-2xl text-wine mt-2">{formatIDR(totalExpenses)}</p>
        </div>
        <div className="bg-wine rounded-xl2 shadow-soft p-5">
          <p className="text-xs font-semibold text-ivory/50">DANA TERSEDIA</p>
          <p className="font-display text-2xl text-ivory mt-2">{formatIDR(available)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SavingsForm onAdd={handleAddSaving} submitting={submitting} />
        <ExpenseForm onAdd={handleAddExpense} submitting={submitting} />
      </div>

      <ExpenseTable
        savings={savingsQuery.items}
        expenses={expensesQuery.items}
        loading={savingsQuery.loading || expensesQuery.loading}
        onDeleteSaving={savingsQuery.remove}
        onDeleteExpense={expensesQuery.remove}
      />
    </div>
  );
}
