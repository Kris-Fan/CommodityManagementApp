import _, {result} from 'lodash';

/**
 * 优惠金额
 * @param price 当前价格
 * @returns 可选优惠金额
 */
const getAutoCoupons = (price: number): number[] => {
  // 根据价格情况计算的
  const autoCoupons: number[] = [];
  // autoCoupons.push(price % 500);
  autoCoupons.push(price % 100);
  autoCoupons.push(price % 50);
  autoCoupons.push(price % 10);
  autoCoupons.push(price % 5);
  return _.sortBy(
    _.filter(
      [...new Set(autoCoupons)],
      coupon => coupon !== 0 && coupon < price,
    ),
  );
};
const getDefaultCoupons = (price: number): number[] => {
  const resultCoupons = [1, 2, 5, 10, 20];
  return resultCoupons.filter(coupon => coupon < price);
};

const getDiscountAmountArr = (
  price: number,
  discounts: number[],
): {discount: number; amount: number}[] => {
  const resultAmount: {discount: number; amount: number}[] = [];
  if (price > 10 && discounts?.length > 0) {
    discounts.map(discount => {
      resultAmount.push({discount, amount: getDiscountAmount(price, discount)});
    });
  }
  return resultAmount;
};
/**
 * 获取折扣金额
 *
 * @param price 原价
 * @param discount 折扣
 * @returns 折扣的金额
 */
const getDiscountAmount = (price: number, discount: number): number => {
  const defaultDiscountAmount = 0;
  if (discount < 0) {
    return defaultDiscountAmount;
  }
  return (
    Number(
      _.min([price, _.subtract(price, (price * discount) / 10)])?.toFixed(2),
    ) || defaultDiscountAmount
  );
};

export {getAutoCoupons, getDiscountAmountArr, getDefaultCoupons};
