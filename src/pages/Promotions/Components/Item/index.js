/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Container, Banner, Title, ViewText, SubTitle, Value} from './styles';

const Item = ({item}) => {
  const navigation = useNavigation();

  function formatReal(int) {
    var tmp = int + '';
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    if (tmp.length > 6) {
      tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
    }

    return 'R$ ' + tmp;
  }
  return (
    <Container onPress={() => navigation.navigate('NewPromotion', {item})}>
      <Banner source={{uri: item.banner}} />
      <ViewText>
        <Title>
          {item && item.title && item.title.length > 30
            ? `${item.title.slice(0, 30)}..`
            : item.title}
        </Title>
        <SubTitle>
          {item && item.description && item.description.length > 30
            ? `${item.description.slice(0, 35)}..`
            : item.description}
        </SubTitle>
        <Value>
          {item && item.value ? formatReal(item.value * 100) : null}
        </Value>
      </ViewText>
    </Container>
  );
};

export default Item;
