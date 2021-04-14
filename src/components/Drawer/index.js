import React, {useCallback, useEffect, useState} from 'react';
import IconF from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native';

import {colors} from '../../global';
import {useAuth} from '../../hooks/Auth';

import {
  Container,
  Header,
  HeaderImage,
  HeaderImageView,
  HeaderTexts,
  HeaderTitle,
  Content,
  RowContent,
  ContentText,
  ContentTitle,
  ImageUser,
} from './styles';

const Drawer = ({state}) => {
  const navigation = state && state.navigation ? state.navigation : '';
  const {signOut, user, language} = useAuth();

  const handleLogout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const getName = useCallback(() => {
    if (user && user.name && !user.name.split(' ').length) {
      return user.name;
    } else if (user && user.name && user.name.split(' ').length) {
      return user.name.split(' ')[0];
    }
    return '';
  }, [user]);

  return (
    <>
      <Container>
        {user ? (
          <>
            <Header>
              <HeaderImage>
                <HeaderImageView>
                  {user && user.image ? (
                    <ImageUser source={{uri: user.image}} />
                  ) : (
                    <IconF name="user" color={colors.grey} size={25} />
                  )}
                </HeaderImageView>
              </HeaderImage>
              <HeaderTexts>
                <HeaderTitle>{user && user.name ? getName() : ''}</HeaderTitle>
              </HeaderTexts>
            </Header>
            <ScrollView>
              <Content>
                <RowContent>
                  <IconF name="star" size={22} color={colors.primary} />
                  <ContentText>AppFeira</ContentText>
                </RowContent>
                <ContentTitle>{'Meu cadastro'}</ContentTitle>
                <RowContent onPress={() => navigation.navigate('Profile')}>
                  <IconF name="user" size={23} color={colors.primary} />
                  <ContentText>{'Perfil'}</ContentText>
                </RowContent>
                <ContentTitle>{'Outras opções'}</ContentTitle>
                <RowContent onPress={handleLogout}>
                  <IconF name="log-out" size={23} color={colors.primary} />
                  <ContentText> {language ? 'OUT' : 'SAIR'}</ContentText>
                </RowContent>
              </Content>
            </ScrollView>
          </>
        ) : (
          <ScrollView>
            <Content style={{marginTop: 24}}>
              <RowContent onPress={() => navigation.navigate('SignIn')}>
                <IconF name="log-in" size={23} color={colors.primary} />
                <ContentText>Entrar</ContentText>
              </RowContent>
              <RowContent onPress={() => navigation.navigate('SignUp')}>
                <IconF name="log-in" size={23} color={colors.primary} />
                <ContentText>Cadastrar</ContentText>
              </RowContent>
            </Content>
          </ScrollView>
        )}
      </Container>
    </>
  );
};

export default Drawer;
