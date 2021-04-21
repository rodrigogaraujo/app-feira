/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Container, Banner, Title} from './styles';

const Item = ({item}) => {
  const navigation = useNavigation();

  return (
    <Container onPress={() => navigation.navigate('NewPromotion', {item})}>
      <Banner source={{uri: item.banner}} />
      <Title>
        {item && item.description && item.description.length > 100
          ? `${item.description.slice(0, 100)}..`
          : item.description}
      </Title>
    </Container>
  );
};

export default Item;
