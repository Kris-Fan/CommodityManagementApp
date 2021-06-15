import React from 'react';
import {useColorScheme, View, StyleProp, ViewStyle} from 'react-native';
import Stepper from '@ant-design/react-native/lib/stepper';
import {Style as styles, basicStyle} from '../../constant/Style';
import {LabelLineLight} from '../common/LabelLine';
import {Item as CommodityItem} from '../commodity/Item';
import {TagIconEnum} from '../../common/interface';

/**
 * 购物车产品项目
 */
export const CartItem: React.FC<{
  title: string;
  content?: string;
  price: string;
  fixedPrice?: string;
  tagList?: string[];
  imageUri?: string;
  onPress?: (_?: any) => void;
  onLongPress?: (_?: any) => void;
  chooseCoupons?: (_?: any) => void;
}> = ({
  title,
  price,
  fixedPrice,
  content,
  tagList,
  imageUri,
  onPress,
  onLongPress,
  chooseCoupons,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyleLight, color, colorLight} = basicStyle(isDarkMode);
  const itemStyle: StyleProp<ViewStyle> = {
    marginBottom: 5,
    paddingVertical: 5,
    ...backgroundStyleLight,
    ...styles.commonBorderRadius,
  };
  // 根据实际情况渲染可用优惠券选项
  const renderAvailableCoupons = () => {
    const isSaleLoss = tagList?.includes(TagIconEnum.LossSale);
    const isSupperDiscount = tagList?.includes(TagIconEnum.SuperDiscount);
    if (+price < 6 || isSaleLoss || isSupperDiscount) {
      return;
    }
    return (
      <LabelLineLight
        title="优惠金额："
        rightIcon
        rightDesc="666"
        onPress={chooseCoupons}
      />
    );
  };
  return (
    <View style={itemStyle}>
      <CommodityItem
        title={title}
        content={content}
        price={price}
        originPrice={fixedPrice}
        imageUri={imageUri}
        tagList={tagList}
        onPress={onPress}
        onLongPress={onLongPress}
        direction={'min'}
      />
      <LabelLineLight title="购买数量：" paddingH={14}>
        <View style={[{width: 150}]}>
          <Stepper
            key="1"
            max={999}
            min={1}
            readOnly={false}
            defaultValue={1}
            onChange={onChange}
            inputStyle={color}
          />
        </View>
      </LabelLineLight>
      {renderAvailableCoupons()}
    </View>
  );
};

const onChange = (value: number) => {
  console.log('changed', value);
};
