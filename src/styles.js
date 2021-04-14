import styled from 'styled-components/native';

const ImageStyle = styled.Image``;

export const Logo = styled(ImageStyle).attrs({
  source: require('./assets/logowhite.png'),
  resizeMode: 'contain',
})`
  width: 100%;
  height: 200px;
  margin-bottom: 60px;
`;
