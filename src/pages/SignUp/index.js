import React, {useCallback, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import Loading from '../../components/Loading';
import {useAuth} from '../../hooks/Auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {colors} from '../../global';
import api from '../../services/api';

import {
  Container,
  Content,
  Logo,
  ForgotPassword,
  ForgotPasswordText,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string().required('email obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

const SignIn = () => {
  const {signIn, language} = useAuth();
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(
    async data => {
      setLoading(true);
      try {
        await api.post('/users', {...data, level: 'client'});
        await signIn({
          email: data.email,
          password: data.password,
        });
        navigation.navigate('Home');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setShowAlert(true);
      }
    },
    [signIn, navigation],
  );

  return loading ? (
    <Loading />
  ) : (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <Container>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
          <Content>
            <Logo />
            <Formik
              initialValues={{email: '', password: '', name: '', document: ''}}
              validationSchema={schema}
              onSubmit={handleSignIn}>
              {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                <>
                  <Input
                    name="name"
                    icon="user"
                    placeholder={
                      language ? 'Type your name' : 'Digite seu name'
                    }
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    error={errors.name}
                  />
                  <Input
                    name="document"
                    icon="credit-card"
                    placeholder={'Informe seu CPF'}
                    autoCorrect={false}
                    autoCapitalize="none"
                    mask="[000].[000].[000]-[00]"
                    onChangeText={handleChange('document')}
                    onBlur={handleBlur('document')}
                    value={values.document}
                    error={errors.document}
                  />
                  <Input
                    name="email"
                    icon="user"
                    placeholder={
                      language ? 'Type your e-mail' : 'Digite seu email'
                    }
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    error={errors.email}
                  />
                  <Input
                    name="password"
                    icon="lock"
                    placeholder={
                      language ? 'Type your pass' : 'Digite sua senha'
                    }
                    password
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                    error={errors.password}
                  />
                  <Button icon="login" onPress={handleSubmit}>
                    Cadastrar
                  </Button>
                </>
              )}
            </Formik>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title={
                language
                  ? 'Incorrect login / password'
                  : 'Login/Senha incorretos'
              }
              message={
                language
                  ? 'Check your credentials and try again'
                  : 'Cheque suas credênciais e tente novamente'
              }
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText={language ? 'Try again' : 'Tentar novamente'}
              confirmButtonColor={colors.primary}
              onConfirmPressed={() => {
                setShowAlert(false);
              }}
            />
            <ForgotPassword onPress={() => navigation.goBack()}>
              <ForgotPasswordText>
                {language ? 'Back' : 'Voltar'}
              </ForgotPasswordText>
            </ForgotPassword>
          </Content>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
