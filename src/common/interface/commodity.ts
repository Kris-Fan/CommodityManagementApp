export interface commodityItemType {
  id: string;
  // 每个商品对应一个唯一名字，具体以type区分
  name: string;
  // 型号
  type: string;
  // 大分类
  category?: string;
  // 商品描述 ，会展示到列表页
  description?: string;
  unit: '件';
  // 进价
  purchasePrice?: number;
  // 定价
  fixedPrice: number;
  // 售价
  sellPrice: number;
  // 折扣
  discount: string;
  // 库存数
  number?: number;
  // 销售数
  sellNumber?: number;
  pictures?: string[];
  // 备注，商品描述不存在情况会展示备注信息
  comment?: string;
  // 商品关联供应厂商id
  factoryId: string;
  // 商品状态
  status: 1;
  // 标签Icon--可用于筛选的
  tagList?: string[];
  // 子项，不同type到商品
  subChoice?: commodityItemType[];
}
