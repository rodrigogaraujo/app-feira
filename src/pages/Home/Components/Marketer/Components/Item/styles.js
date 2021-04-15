import styled from 'styled-components';

import {colors, fonts} from '../../../../../../global';

const ImageStyle = styled.Image``;

export const Container = styled.TouchableOpacity`
  height: 240px;
  width: 300px;
  background-color: ${colors.primary_correct};
  border-width: 1px;
  border-color: ${colors.primary_correct};
  border-radius: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  margin-right: 12px;
`;

export const ViewText = styled.View`
  margin-left: 12px;
  flex-wrap: wrap;
`;

export const Title = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.black};
  font-family: ${fonts.fontFamilyRegular};
  flex-wrap: wrap;
  width: 280px;
  color: ${colors.white_correct};
`;

export const Banner = styled(ImageStyle).attrs({})`
  width: 282px;
  height: 150px;
  border-radius: 6px;
`;
