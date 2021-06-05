import React, {useRef, useState} from 'react';
import {
  Image,
  ImageStyle,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {BaseUrl, Colors, GoodsDetail, ImageUrl, Size} from '../../constant';
import {Style as styles, basicStyle} from '../../constant/Style';
import {NavigationInjectedProps} from 'react-navigation';
import {commodityItemType} from '../../common/interface/commodity';
import {Badge, DisplayPrice, TagNumber} from '../common/Price';
import {displaySaleNumber} from '../../utils/numberUtil';
import {Button, GhostButton} from '../common/Button';
import Icon from '../common/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {OutlineGlyphMapType} from '@ant-design/icons-react-native/lib/index';
import Modal from '@ant-design/react-native/lib/modal';
import Toast from '@ant-design/react-native/lib/toast';
import {BlankLine, BlankSpace, RetangleGroup, Square} from '../common/Square';
import {LabelLineLight, LabelLineTint} from '../common/LabelLine';
import {CommodityTitle} from './Item';
import {APPScheme, ModalContentEnum, SourceFrom} from '../../common/enum';

/**
 * 商品详情页
 */
const Detail: React.FC<NavigationInjectedProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle, backgroundStyleLight, colorLight} = basicStyle(
    isDarkMode,
  );
  const data: commodityItemType = navigation.getParam('item') || {};
  const imageUri = BaseUrl + ImageUrl + '/test.png';
  const [visible, setVisible] = useState(false);
  const onShowModal = () => setVisible(true);
  const onClose = () => setVisible(false);
  const [modalContentType, setModalContentType] = useState<ModalContentEnum>();
  const modalRef = useRef<Modal>(null);
  const renderModal = () => {
    if (modalContentType === ModalContentEnum.SHARE_COMMODITY) {
      return <ShareModal data={data} />;
    }
    if (modalContentType === ModalContentEnum.MORE_COMMODITY_DETAIL) {
      return <MoreModal navigation={navigation} current={modalRef.current} />;
    }
    if (modalContentType === ModalContentEnum.EXCHANGE_TYPE) {
      return <ExchangeTypeModal data={data} />;
    }
  };
  return (
    <SafeAreaView style={[styles.fullScreen, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor={Colors.transparent2}
      />
      <DetailTopBar
        navigation={navigation}
        onPressShare={() => {
          setModalContentType(ModalContentEnum.SHARE_COMMODITY);
          onShowModal();
        }}
        onPressMore={() => {
          setModalContentType(ModalContentEnum.MORE_COMMODITY_DETAIL);
          onShowModal();
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Image
          resizeMode="cover"
          source={{uri: imageUri}}
          style={commodityImage}
        />
        <View
          style={[
            backgroundStyleLight,
            styles.paddingVertical,
            styles.paddingHorizontal,
          ]}>
          <RetangleGroup marginH={0} justifyContent="space-between">
            <View>
              <DisplayPrice
                price={data.sellPrice}
                originPrice={data.fixedPrice}
              />
            </View>
            <TagNumber
              tag="已售"
              number={displaySaleNumber(data.sellNumber) + data.unit}
            />
          </RetangleGroup>
          <CommodityTitle
            title={`${data.name} ${data.type}`}
            content={data.description}
            bold
          />
          <RetangleGroup marginH={0} justifyContent="flex-start">
            <Badge bgColor={Colors.coral}>超值低价</Badge>
            <BlankSpace />
            <Badge outline>60</Badge>
            <Badge>6</Badge>
            <BlankSpace />
            <Badge outline>60</Badge>
            <BlankSpace />
            <Badge outline>超值低价</Badge>
          </RetangleGroup>
        </View>
        <BlankLine />
        <LabelLineTint
          name={data.type}
          description="切换型号"
          iconName="retweet"
          style={{
            bgColor: backgroundStyleLight.backgroundColor,
            color: colorLight.color,
            tintColor: Colors.primaryLight,
          }}
          rightIcon
          onPress={() => {
            setModalContentType(ModalContentEnum.EXCHANGE_TYPE);
            onShowModal();
          }}
        />

        <BlankLine />
        <RetangleGroup title="备注信息" justifyContent="flex-start">
          <LabelLineLight title={data.comment} />
        </RetangleGroup>
        <BlankLine />
        <RetangleGroup title="源厂商" justifyContent="flex-start">
          <LabelLineLight
            icon={{fillName: 'shop', color: Colors.primaryLight}}
            title={data.factoryId}
          />
        </RetangleGroup>
      </ScrollView>
      <DetailBottom />
      {/*浮层 */}
      <Modal
        popup
        visible={visible}
        animationType="slide-up"
        onClose={onClose}
        closable={true}
        maskClosable
        style={styles.transBackground}
        ref={modalRef}>
        <View style={[backgroundStyleLight, styles.modalViewStyle]}>
          {renderModal()}
          <BlankLine />
          <GhostButton name="关闭" onPress={onClose} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

/**
 * 顶部导航，返回、更多
 */
const DetailTopBar: React.FC<
  NavigationInjectedProps & {
    onPressShare: (_?: any) => void;
    onPressMore: (_?: any) => void;
  }
> = ({navigation, onPressMore, onPressShare}) => {
  const viewStyle: StyleProp<ViewStyle> = {
    justifyContent: 'space-between',
    position: 'absolute',
    top: 30,
    zIndex: 100,
    width: '100%',
  };
  return (
    <View
      style={[
        styles.flexRowView,
        styles.paddingHorizontal,
        styles.paddingVertical,
        viewStyle,
      ]}>
      <FloatButton iconName="left" name="" onPress={navigation.goBack} />
      <View style={styles.flexRowView}>
        <FloatButton iconName="share-alt" name="" onPress={onPressShare} />
        <FloatButton iconName="more" name="" onPress={onPressMore} />
      </View>
    </View>
  );
};
/**
 * 底部栏-提供功能：分析、编辑、删除
 */
const DetailBottom: React.FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyleLight} = basicStyle(isDarkMode);
  const containerStyle: StyleProp<ViewStyle> = {
    ...backgroundStyleLight,
    ...styles.flexRowView,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
  };
  const [isFav, setFav] = useState(false);

  return (
    <View style={containerStyle}>
      <FavButton light={isFav} onPress={() => setFav(!isFav)} />
      <View style={styles.flexRowView}>
        <GhostButton name="至进货单" />
        <Button name="  添加到客户订单  " />
      </View>
    </View>
  );
};

/**
 * 收藏
 */
const FavButton: React.FC<{light: boolean; onPress?: (_?: any) => void}> = ({
  light,
  onPress,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {colorLight} = basicStyle(isDarkMode);
  const favStyle = {
    fontSize: Size.iconSizeLight,
  };
  const viewStyle: StyleProp<ViewStyle> = {alignItems: 'center'};
  const fillHeart: StyleProp<ViewStyle> = {display: light ? 'flex' : 'none'};
  const heart: StyleProp<ViewStyle> = {display: !light ? 'flex' : 'none'};
  return (
    <TouchableOpacity style={viewStyle} onPress={onPress}>
      <Icon fillName="heart" color={Colors.red} style={[favStyle, fillHeart]} />
      <Icon name="heart" color={colorLight.color} style={[favStyle, heart]} />
      <Text style={[colorLight, heart]}>{light ? '已收藏' : '收藏'}</Text>
    </TouchableOpacity>
  );
};

/**
 * 半透明圆形按钮
 */
const FloatButton: React.FC<{
  iconName: OutlineGlyphMapType;
  name?: string;
  onPress?: (_?: any) => void;
}> = ({iconName, name, onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {colorLight} = basicStyle(isDarkMode);
  const viewStyle: StyleProp<ViewStyle> = {
    alignItems: 'center',
    backgroundColor: Colors.transparent2,
    borderRadius: 40,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginHorizontal: 2,
  };

  const renderText = () => {
    if (name) {
      return <Text style={colorLight}>{name}</Text>;
    }
  };
  return (
    <TouchableOpacity style={viewStyle} onPress={onPress}>
      <Icon name={iconName} color={Colors.white} size={Size.iconSizeLight} />
      {renderText()}
    </TouchableOpacity>
  );
};

/**
 * 分享组件
 */
const ShareModal: React.FC<{data: commodityItemType}> = ({data}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {color} = basicStyle(isDarkMode);
  const datailUrl = `${BaseUrl}${GoodsDetail}/${data.id}?sourceFrom=${SourceFrom.RN}`;
  const failMessage = 'Open failed';
  return (
    <RetangleGroup justifyContent="flex-start" title="分享至" marginH={0}>
      <Square
        name="微信"
        icon={{fillName: 'wechat', color: Colors.green, needBg: true}}
        onPress={() => {
          Linking.canOpenURL(APPScheme.WEIXIN)
            .then(support => {
              if (support) {
                return Linking.openURL(APPScheme.WEIXIN);
              } else {
                Toast.fail('无法打开微信', 2);
              }
            })
            .catch(error => {
              Toast.fail(failMessage + error, 2);
            });
        }}
      />
      <Square
        name="微博"
        icon={{
          name: 'weibo-circle',
          color: Colors.watermelon,
          needBg: true,
        }}
        onPress={() => {
          Linking.canOpenURL(APPScheme.WEIBO)
            .then(support => {
              if (support) {
                return Linking.openURL(APPScheme.WEIBO);
              } else {
                Toast.fail('未安装微博', 2);
              }
            })
            .catch(error => {
              Toast.fail(failMessage + error, 2);
            });
        }}
      />
      <Square
        name="QQ"
        icon={{
          name: 'qq',
          needBg: true,
        }}
        onPress={() => {
          Linking.canOpenURL(APPScheme.QQ)
            .then(support => {
              if (support) {
                return Linking.openURL(APPScheme.QQ);
              } else {
                Toast.fail('未安装QQ', 2);
              }
            })
            .catch(error => {
              Toast.fail(failMessage + error, 2);
            });
        }}
      />
      <Square
        name="二维码分享"
        descName="点击生成并保存到手机"
        icon={{name: 'qrcode', color: Colors.deepSky, needBg: true}}
        onPress={() => {}}
      />
      <Square
        name="浏览器"
        icon={{name: 'global', color: Colors.primaryLight, needBg: true}}
        onPress={() => {
          Linking.canOpenURL(datailUrl)
            .then(support => {
              if (support) {
                return Linking.openURL(datailUrl);
              } else {
                Toast.fail('无法打开浏览器', 2);
              }
            })
            .catch(error => {
              Toast.fail(failMessage + error, 2);
            });
        }}
      />
      <Square
        name="复制链接"
        icon={{name: 'link', color: color.color, needBg: true}}
        onPress={() => {}}
      />
    </RetangleGroup>
  );
};

/**
 * 更多功能
 */
const MoreModal: React.FC<NavigationInjectedProps & React.RefObject<Modal>> = ({
  navigation,
  current,
}) => {
  const {onClose} = current?.props || {};
  return (
    <RetangleGroup justifyContent="flex-start" title="更多" marginH={0}>
      <Square
        name="编辑"
        icon={{name: 'edit', needBg: true}}
        onPress={() => {}}
      />
      <Square
        name="下线商品"
        icon={{name: 'eye-invisible', color: Colors.sand, needBg: true}}
        onPress={() => {}}
      />
      <Square
        name="删除商品"
        icon={{name: 'delete', color: Colors.watermelon, needBg: true}}
        onPress={() => {}}
      />
      <Square
        name="关闭本页"
        icon={{name: 'close-circle', color: Colors.grisaillf, needBg: true}}
        onPress={() => {
          if (onClose) {
            onClose();
          }
          navigation.goBack();
        }}
      />
    </RetangleGroup>
  );
};

/**
 * 切换型号
 */
const ExchangeTypeModal: React.FC<{data: commodityItemType}> = ({data}) => {
  return (
    <View>
      <RetangleGroup title="全部型号" justifyContent="flex-start">
        <Square
          name={data.type}
          descName="剩余1"
          icon={{
            name: 'appstore',
            color: Colors.primaryLight,
            size: Size.iconSize,
          }}
        />
      </RetangleGroup>
    </View>
  );
};
const commodityImage: StyleProp<ImageStyle> = {
  backgroundColor: Colors.grisaillf,
  height: 300,
  width: '100%',
};

export default Detail;
