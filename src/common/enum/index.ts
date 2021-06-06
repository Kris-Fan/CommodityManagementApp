export enum SourceFrom {
  RN = 'RN',
  H5 = 'H5',
}

export enum APPScheme {
  QQ = 'mqq://',
  WEIXIN = 'weixin://',
  WEIBO = 'weibo://',
}

export enum ScanTypeEnum {
  // 通用
  COMMON,
  // 添加订单
  ADD_TO_CART,
  // 查找商品
  SEARCH,
  // 新增商品
  ADD_NEW_COMMIDITY,
  // 添至进货单
  ADD_TO_PURCHASE_CART,
}

export * from './modalEnum';
