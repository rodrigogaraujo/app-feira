import styled from 'styled-components';

import {colors, fonts} from '../../../../global';

const ImageStyle = styled.Image``;

export const Container = styled.TouchableOpacity`
  height: 100px;
  border-width: 1px;
  border-color: ${colors.primary_correct};
  border-radius: 12px;
  margin-top: 12px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
`;

export const ViewText = styled.View`
  margin-left: 12px;
`;

export const Title = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.black};
  font-family: ${fonts.fontFamilyRegular};
`;

export const Value = styled.Text`
  font-size: ${fonts.bigger};
  color: ${colors.primary_correct};
  font-family: ${fonts.fontFamilyRegular};
`;

export const SubTitle = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.black};
  font-family: ${fonts.fontFamilyRegular};
`;

export const Banner = styled(ImageStyle).attrs({})`
  width: 80px;
  height: 80px;
  border-radius: 6px;
`;
