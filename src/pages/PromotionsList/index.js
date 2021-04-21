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
  const [data, setData] = useState([]);

  const getItems = useCallback(async txt => {
    try {
      setLoading(true);
      const resp = await api.get(`promotion?data=${txt ? txt : ''}`);
      setData(resp.data.filter(promo => promo.status));
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
        title="Promoções para você"
      />
      <ViewScroll>
        <RefreshControl
          onRefresh={handleRefresh}
          style={{flex: 1}}
          refreshing={refreshing}>
          <ScrollViewStyled contentContainerStyle={{flexGrow: 1}}>
            <Content>
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
