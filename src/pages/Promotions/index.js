/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import api from '../../services/api';

import {
  Container,
  Content,
  ScrollViewStyled,
  ViewScroll,
  FlatListStyled,
} from './styles';
import Item from './Components/Item';

const Promotions = props => {
  const {goBack, navigate} = props.navigation;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(data);

  const getItems = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await api.get('promotion-user');
      setData(resp.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getItems();
    setRefreshing(false);
  }, [getItems]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <Container>
      <Header
        action={() => goBack()}
        icon="arrow-left"
        title="Suas promoções"
      />
      <ViewScroll>
        <RefreshControl
          onRefresh={handleRefresh}
          style={{flex: 1}}
          refreshing={refreshing}>
          <ScrollViewStyled contentContainerStyle={{flexGrow: 1}}>
            <Content>
              <Button icon="check" onPress={() => navigate('NewPromotion')}>
                Adicionar nova
              </Button>
              <FlatListStyled
                data={data && data.length ? data : []}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={item => item.id}
              />
            </Content>
          </ScrollViewStyled>
        </RefreshControl>
      </ViewScroll>
    </Container>
  );
};

export default Promotions;
