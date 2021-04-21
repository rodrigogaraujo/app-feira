import styled from 'styled-components';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {colors, fonts} from '../../../../global';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Icon = styled(SimpleLineIcon)``;

export const Option = styled.TouchableOpacity`
  min-width: 48%;
  height: 150px;
  border-radius: 20px;
  border-width: 2px;
  border-color: ${colors.primary_correct};
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

export const TextButton = styled.Text`
  color: ${colors.black};
  font-size: ${fonts.bigger};
  font-family: ${fonts.fontFamilyRegular};
`;

export const FlatListStyled = styled.FlatList`
  height: 280px;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${fonts.bigger};
  color: ${colors.primary_correct};
  font-family: ${fonts.fontFamilyBold};
  flex-wrap: wrap;
  width: 280px;
`;
