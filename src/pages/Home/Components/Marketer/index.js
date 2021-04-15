import React, {useEffect, useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import Loading from '../../../../components/Loading';
import {colors} from '../../../../global';
import api from '../../../../services/api';

import {
  Container,
  TextButton,
  Option,
  Icon,
  FlatListStyled,
  Content,
  Title,
} from './styles';
import Item from './Components/Item';

const Marketer = () => {
  const navigation = useNavigation();
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAgreements = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await api.get('agreements');
      setAgreements(resp.data.filter(ag => ag.status));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getAgreements();
  }, [getAgreements]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Title>Convênios para você</Title>
          <FlatListStyled
            data={agreements && agreements.length ? agreements : []}
            horizontal={true}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
          <Content>
            <Option>
              <Icon
                name="basket-loaded"
                size={45}
                color={colors.primary_correct}
              />
              <TextButton>Pedidos</TextButton>
            </Option>
            <Option onPress={() => navigation.navigate('PromotionsList')}>
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
          </Content>
        </>
      )}
    </Container>
  );
};

export default Marketer;
