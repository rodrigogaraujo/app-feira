/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Header from '../../components/Header';
import Button from '../../components/Button';

import {Container, Content, ScrollViewStyled, ViewScroll} from './styles';

const Item = props => {
  const {goBack} = props.navigation;

  return (
    <Container>
      <Header
        action={() => goBack()}
        icon="arrow-left"
        title="Suas promoções"
      />
      <ViewScroll>
        <ScrollViewStyled contentContainerStyle={{flexGrow: 1}}>
          <Content>
            <Button icon="check">Adicionar novo</Button>
          </Content>
        </ScrollViewStyled>
      </ViewScroll>
    </Container>
  );
};

export default Item;
