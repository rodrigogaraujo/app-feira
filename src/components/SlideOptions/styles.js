import styled, {css} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import {colors, fonts} from '../../global';

const {width} = Dimensions.get('window');

export const Container = styled.View`
  min-height: 51px;
  border-left-width: 0;
  border-right-width: 0;
  margin: 0 10px;
  padding: 5px 0;
  flex-direction: row;
`;

export const Content = styled.View`
  flex-direction: row;
  min-height: 51px;
  align-items: center;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  width: ${width * 0.1}px;
`;

export const ItemContainerWidth = width - 120;
export const ItemContainer = styled.TouchableOpacity`
  flex: 1;
  min-height: 39px;
  justify-content: center;
  align-items: center;
  width: ${ItemContainerWidth}px;
`;

export const Item = styled.View`
  background-color: ${colors.primary};
  min-height: 39px;
  justify-content: center;
  align-items: center;
  width: ${width * 0.55}px;
  /* margin: 0 ${width * 0.2}px 0 0; */
  border-radius: 5px;
`;

export const Text = styled.Text`
  color: ${colors.white};
  text-align: center;
  width: ${width * 0.5}px;
  margin: 5px 0px;
  font-size: ${fonts.regular};
  font-family: ${fonts.fontFamilyRegular};
  padding: 12px;
`;

export const Button = styled.View`
  justify-content: center;
  align-items: center;
  width: 50px;

  ${(props) =>
    !props.visible &&
    css`
      opacity: 0;
    `}
`;

export const BackIcon = styled(Icon).attrs({
  name: 'arrow-back',
  size: 20,
})`
  color: ${colors.primary};
`;

export const NextIcon = styled(Icon).attrs({
  name: 'arrow-forward',
  size: 20,
})`
  color: ${colors.primary};
`;
