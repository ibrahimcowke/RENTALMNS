/**
 * Formats a currency value as USD.
 * @param amount Amount in USD
 */
export const formatCurrency = (amount: number | null | undefined): string => {
  const safeAmount = Number(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(safeAmount);
};
