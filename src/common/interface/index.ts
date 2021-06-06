import {Colors} from '../../constant';

export interface TagItemType {
  color: string;
  name: string;
  outline?: boolean;
}

export const TagIconListMap: {[_: string]: TagItemType} = {
  NewProduct: {
    color: Colors.green,
    name: '新品',
  },
  LowPrice: {
    color: Colors.red2,
    name: '超值低价',
    outline: true,
  },
  Discount: {
    color: Colors.coral,
    name: '折扣',
    outline: true,
  },
  SuperDiscount: {
    color: Colors.watermelon,
    name: '亏本销售',
  },
};

export * from './commodity';
