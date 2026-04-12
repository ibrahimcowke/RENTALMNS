/**
 * Formats a currency value based on the selected currency and exchange rate.
 * @param amount Amount in USD
 * @param currency 'USD' or 'SOS'
 * @param exchangeRate Current exchange rate (1 USD to SOS)
 */
export const formatCurrency = (amount: number, currency: 'USD' | 'SOS', exchangeRate: number): string => {
  if (currency === 'SOS') {
    const sosAmount = amount * exchangeRate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SOS',
      minimumFractionDigits: 0,
    }).format(sosAmount).replace('SOS', 'SOS ');
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
