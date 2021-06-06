/**
 * 保留两位小数，如果是0不展示，如1.299输出1.3
 * @param price
 */
export const displayPrice = (price: number | string): string => {
  if (isNaN(Number(price))) {
    return 'Invaild Price';
  }
  return String(Math.round(Number(price) * 100) / 100);
};

export const calDiscount = (
  originPrice: number | string,
  truePrice: number | string,
) => {
  if (isNaN(Number(originPrice)) && isNaN(Number(truePrice))) {
    return 'Invaild Price';
  }
  return ((Number(truePrice) / Number(truePrice)) * 10).toFixed(1);
};

export const displaySaleNumber = (num: number | undefined): string => {
  if (!num) {
    return '0';
  }
  if (num > 1000) {
    return '1000+';
  }
  return num + '';
};
