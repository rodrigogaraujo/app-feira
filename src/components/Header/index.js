import React, {useCallback} from 'react';
import {View} from 'react-native';

import {useAuth} from '../../hooks/Auth';
import {colors} from '../../global';

import {Container, Icon, MenuButton, TextStyled} from './styles';

const Home = ({action, icon, title = ''}) => {
  const {user, language} = useAuth();

  const getName = useCallback(() => {
    if (user && user.name && !user.name.split(' ').length) {
      return user.name;
    } else if (user && user.name && user.name.split(' ').length) {
      return user.name.split(' ')[0];
    }
    return '';
  }, [user]);

  return (
    <Container>
      {icon ? (
        <MenuButton onPress={action}>
          <Icon name={icon} size={28} color={colors.white} />
        </MenuButton>
      ) : (
        <View />
      )}
      {user && user.name ? (
        <TextStyled>{!title ? `Olá ${getName()}` : title} .</TextStyled>
      ) : (
        <TextStyled>{'Olá, veja nossos produtos abaixo'}</TextStyled>
      )}
    </Container>
  );
};

export default Home;
