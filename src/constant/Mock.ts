import {commodityItemType} from '../common/interface/commodity';

const CONTACT_DATA = [
  {
    alpha: 'A',
    data: [
      {
        id: '1',
        name: 'Anna',
        telphone: '15566667777',
        address: 'ooooo',
        company: 'xxcompany',
        email: '',
      },
      {
        id: '2',
        name: '埃沙Alsa',
        telphone: '13344445555',
        address: '',
        company: 'xxxxc',
        email: '',
      },
    ],
  },
  {
    alpha: 'B',
    data: [
      {
        id: '3',
        name: 'Bob',
        telphone: '12312345678',
        address: '',
        company:
          'ckdjfjgjgkdgjjkgdkgjkdjgkjgkfjkjhkfjhkjkhfjk||||ckdjfjgjgkdgjjkgdkgjkdjgkjgkfjkjhkfjhkjkhfjk',
        email: '',
      },
      {
        id: '4',
        name: '鲍勃',
        telphone: '',
        address: '',
        company: '',
        email: '',
      },
    ],
  },
  {
    alpha: 'C',
    data: [
      {
        id: '5',
        name: '曹操',
        telphone: '',
        address: '',
        company: '',
        email: '',
      },
      {
        id: '6',
        name: '曹冲',
        telphone: '',
        address: '',
        company: '',
        email: '',
      },
    ],
  },
  {
    alpha: 'Z',
    data: [
      {id: '7', name: '张', telphone: '', address: '', company: '', email: ''},
      {
        id: '8',
        name: '张小请',
        telphone: '1234566',
        address: '',
        company: '',
        email: '',
      },
      {
        id: '9',
        name: '张浩楠',
        telphone: '100029349598',
        address: '',
        company: '',
        email: '',
      },
      {
        id: '10',
        name: '张三',
        telphone: '110667788999',
        address: '',
        company: '',
        email: '',
      },
    ],
  },
  {
    alpha: '#',
    data: [
      {
        id: '11',
        name: '123',
        telphone: '',
        address: '',
        company: '',
        email: '',
      },
      {id: '12', name: '2', telphone: '', address: '', company: '', email: ''},
      {id: '13', name: '5', telphone: '', address: '', company: '', email: ''},
      {id: '14', name: '6', telphone: '', address: '', company: '', email: ''},
    ],
  },
];

const COMMODITY_DATA: {
  code: number;
  desc: string;
  data: commodityItemType[];
} = {
  code: 0,
  desc: 'got success',
  data: [
    {
      id: '1',
      name: '测试产品1',
      type: 'ZHN0007',
      category: 'string',
      // 商品描述 ，会展示到列表页
      description: 'string',
      unit: '件',
      // purchasePrice: 666,
      fixedPrice: 888,
      sellPrice: 888,
      discount: '1',
      // 库存数
      number: 1001,
      sellNumber: 1,
      pictures: ['product/test.png'],
      comment: '无',
      factoryId: '607173aed05891adfe7baf85',
      status: 1,
      tagList: ['NewProduct'],
    },
    {
      id: '2',
      name: '测试商品名称',
      type: 'ZHN0007',
      category: 'string',
      // 商品描述 ，会展示到列表页
      description:
        '测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称测试商品名称',
      unit: '件',
      // purchasePrice: 666,
      fixedPrice: 888,
      sellPrice: 666,
      discount: '7.5',
      // 库存数
      number: 1001,
      sellNumber: 100,
      pictures: ['product/test.png'],
      comment: '无',
      factoryId: '607173aed05891adfe7baf85',
      status: 1,
      tagList: ['NewProduct', 'LowPrice', 'Discount', 'SuperDiscount'],
    },
    {
      id: '3',
      name: '测试产品3',
      type: 'ZHN0007',
      category: 'string',
      // 商品描述 ，会展示到列表页
      description: 'breif descbreif descbreif descbreif descbreif desc',
      unit: '件',
      // purchasePrice: 666,
      fixedPrice: 888,
      sellPrice: 888,
      discount: '1',
      // 库存数
      number: 1001,
      sellNumber: 10000,
      pictures: ['product/test.png'],
      comment: '无',
      factoryId: '607173aed05891adfe7baf85',
      status: 1,
      tagList: ['NewProduct', 'LowPrice', 'Discount', 'LossSale'],
    },
    {
      id: '',
      name: '测试产品3',
      type: 'ZHN0007',
      category: 'string',
      // 商品描述 ，会展示到列表页
      description: 'breif descbreif descbreif descbreif descbreif desc',
      unit: '件',
      // purchasePrice: 666,
      fixedPrice: 888,
      sellPrice: 999,
      discount: '1',
      // 库存数
      number: 1001,
      sellNumber: 1,
      pictures: ['product/test.png'],
      comment: '无',
      factoryId: '607173aed05891adfe7baf85',
      status: 1,
      tagList: ['OldProduct'],
    },
    {
      id: '607173aed05891ad',
      name: '测试产品3',
      type: 'ZHN0007',
      category: 'string',
      // 商品描述 ，会展示到列表页
      description: 'breif descbreif descbreif descbreif descbreif desc',
      unit: '件',
      // purchasePrice: 666,
      fixedPrice: 888,
      sellPrice: 888,
      discount: '1',
      // 库存数
      number: 1001,
      sellNumber: 1,
      pictures: ['product/test.png'],
      comment: '无',
      factoryId: '607173aed05891adfe7baf85',
      status: 1,
    },
    {
      id: '607173dfd05891adfe7baf86',
      name: '测试产品3',
      type: 'ZHN0007',
      category: 'string',
      // 商品描述 ，会展示到列表页
      description: 'breif descbreif descbreif descbreif descbreif desc',
      unit: '件',
      // purchasePrice: 666,
      fixedPrice: 888,
      sellPrice: 888,
      discount: '1',
      // 库存数
      number: 1001,
      sellNumber: 1,
      pictures: ['product/test.png'],
      comment: '无',
      factoryId: '607173aed05891adfe7baf85',
      status: 1,
    },
  ],
};

export default {
  CONTACT_DATA,
  COMMODITY_DATA,
};
