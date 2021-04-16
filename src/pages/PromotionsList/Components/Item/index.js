/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../../../global';

import {
  Container,
  Banner,
  Title,
  ViewText,
  SubTitle,
  Value,
  ViewBottom,
  ViewItemBottom,
  Icon,
  ViewTwoItemBottom,
} from './styles';

const Item = ({item}) => {
  const navigation = useNavigation();
  const [value, setValue] = useState(0);

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
      <ViewBottom>
        <ViewItemBottom>
          <Icon name="speech" size={25} color={colors.black} />
        </ViewItemBottom>
        <ViewTwoItemBottom>
          {value > 0 ? (
            <ViewItemBottom onPress={() => setValue(stt => stt - 1)}>
              <Icon name="minus" size={25} color={colors.red} />
            </ViewItemBottom>
          ) : null}
          <ViewItemBottom onPress={() => setValue(stt => stt + 1)}>
            <Icon name="plus" size={25} color={colors.primary_correct} />
          </ViewItemBottom>
          <Value>{value}</Value>
        </ViewTwoItemBottom>
      </ViewBottom>
    </Container>
  );
};

export default Item;
