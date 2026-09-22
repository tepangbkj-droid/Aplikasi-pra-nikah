import { createContext, useContext, useMemo } from "react";
import { useFirestore } from "../hooks/useFirestore";

const AppContext = createContext(null);

// Ganti sesuai target kalian berdua.
const SAVINGS_TARGET = 120_000_000;
const WEDDING_DATE = "2027-04-17"; // yyyy-mm-dd

/**
 * Menyediakan data lintas modul (checklist, tabungan, pengeluaran, emas)
 * dalam satu tempat, supaya Dashboard (dan halaman lain nanti) tidak perlu
 * memanggil useFirestore berulang-ulang untuk data yang sama.
 */
export function AppProvider({ children }) {
  const checklist = useFirestore("checklist");
  const savings = useFirestore("savings");
  const expenses = useFirestore("expenses");
  const goldEntries = useFirestore("goldEntries", { orderByField: "date" });
  const vendors = useFirestore("vendors");
  const items = useFirestore("items");

  const summary = useMemo(() => {
    const totalSavings = savings.items.reduce((sum, s) => sum + Number(s.amount), 0);
    const totalExpenses = expenses.items.reduce((sum, e) => sum + Number(e.amount), 0);
    const checklistDone = checklist.items.filter((i) => i.done).length;
    const checklistTotal = checklist.items.length;

    const daysLeft = Math.ceil(
      (new Date(WEDDING_DATE).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    );

    return {
      currentSavings: totalSavings,
      targetSavings: SAVINGS_TARGET,
      totalExpenses,
      availableFunds: totalSavings - totalExpenses,
      checklistDone,
      checklistTotal,
      daysLeft: Number.isFinite(daysLeft) ? daysLeft : null,
      weddingDate: WEDDING_DATE,
    };
  }, [savings.items, expenses.items, checklist.items]);

  const value = {
    checklist,
    savings,
    expenses,
    goldEntries,
    vendors,
    items,
    summary,
    loading:
      checklist.loading ||
      savings.loading ||
      expenses.loading ||
      goldEntries.loading ||
      vendors.loading ||
      items.loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext harus dipakai di dalam <AppProvider>");
  }
  return ctx;
}
