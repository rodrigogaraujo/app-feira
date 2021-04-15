import styled from 'styled-components';

import {colors, fonts} from '../../../../global';

const ImageStyle = styled.Image``;

export const Container = styled.View`
  border-width: 1px;
  border-color: ${colors.primary_correct};
  border-radius: 12px;
  margin-top: 12px;
  align-items: center;
  padding: 10px;
`;

export const ViewText = styled.View``;

export const Title = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.black};
  text-align: center;
  margin-top: 12px;
  font-family: ${fonts.fontFamilyRegular};
`;

export const Value = styled.Text`
  font-size: ${fonts.bigger};
  color: ${colors.primary_correct};
  font-family: ${fonts.fontFamilyRegular};
  text-align: center;
`;

export const SubTitle = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.black};
  font-family: ${fonts.fontFamilyRegular};
  text-align: center;
`;

export const Banner = styled(ImageStyle).attrs({})`
  width: 100%;
  height: 320px;
  border-radius: 6px;
`;
