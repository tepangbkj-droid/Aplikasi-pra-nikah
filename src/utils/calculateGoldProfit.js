export function calculateGoldProfit(currentPricePerGram, buyPricePerGram, grams) {
  const cost = Number(buyPricePerGram) * Number(grams);
  const value = Number(currentPricePerGram) * Number(grams);
  const profitNominal = value - cost;
  const profitPercent = cost > 0 ? (profitNominal / cost) * 100 : 0;

  return {
    costBasis: cost,
    currentValue: value,
    profitNominal,
    profitPercent,
    isProfit: profitNominal >= 0,
  };
}

export function summarizeGoldEntries(entries, currentPricePerGram) {
  return entries.reduce(
    (acc, entry) => {
      const { costBasis, currentValue, profitNominal } = calculateGoldProfit(
        currentPricePerGram,
        entry.buyPrice,
        entry.grams
      );
      return {
        totalCost: acc.totalCost + costBasis,
        totalValue: acc.totalValue + currentValue,
        totalProfit: acc.totalProfit + profitNominal,
        totalGrams: acc.totalGrams + Number(entry.grams),
      };
    },
    { totalCost: 0, totalValue: 0, totalProfit: 0, totalGrams: 0 }
  );
}
