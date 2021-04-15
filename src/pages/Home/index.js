/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import Loading from '../../components/Loading';
import Header from '../../components/Header';
import {useAuth} from '../../hooks/Auth';
import {colors} from '../../global';

import Provider from './Components/Provider';
import Marketer from './Components/Marketer';

import {
  Container,
  Content,
  ScrollViewStyled,
  InviteUser,
  InviteUserText,
  Icon,
  ButtonIcon,
  ViewScroll,
} from './styles';

const Home = props => {
  const {toggleDrawer} = props.navigation;
  const navigation = useNavigation();
  const {user, language} = useAuth();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  return (
    <Container>
      <Header action={() => toggleDrawer()} icon="menu" />
      <ViewScroll>
        <ScrollViewStyled contentContainerStyle={{flexGrow: 1}}>
          <Content>
            {loading ? (
              <Loading />
            ) : (
              <>
                {showMessage && user && (
                  <InviteUser
                    onPress={() => {
                      navigation.navigate('Profile');
                    }}>
                    <InviteUserText>
                      {language ? 'Welcome' : 'Seja bem vindo(a)'} {user.name}
                    </InviteUserText>
                    <ButtonIcon onPress={() => setShowMessage(false)}>
                      <Icon name="close" size={20} color={colors.secondary} />
                    </ButtonIcon>
                  </InviteUser>
                )}
              </>
            )}
            {user && user.level === 'provider' ? <Provider /> : null}
            {user && user.level === 'marketer' ? <Marketer /> : null}
          </Content>
        </ScrollViewStyled>
      </ViewScroll>
    </Container>
  );
};

export default Home;
