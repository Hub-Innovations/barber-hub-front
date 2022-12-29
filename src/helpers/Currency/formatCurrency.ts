export const formatToCurrency = (currency: number) => {
  return currency.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};
