import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../../../global';

import {Container, TextButton, Option, Icon} from './styles';

const Item = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Option>
        <Icon name="basket-loaded" size={45} color={colors.primary_correct} />
        <TextButton>Pedidos</TextButton>
      </Option>
      <Option onPress={() => navigation.navigate('Promotions')}>
        <Icon name="layers" size={45} color={colors.primary_correct} />
        <TextButton>Promoções</TextButton>
      </Option>
      <Option>
        <Icon name="speech" size={45} color={colors.primary_correct} />
        <TextButton>Chat</TextButton>
      </Option>
      <Option>
        <Icon name="info" size={45} color={colors.primary_correct} />
        <TextButton>Informativo</TextButton>
      </Option>
    </Container>
  );
};

export default Item;
