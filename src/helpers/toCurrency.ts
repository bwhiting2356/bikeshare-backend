export const toCurrency = (longPrice: number): number => {
    return parseFloat(longPrice.toFixed(2));
};