/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useNavigation} from '@react-navigation/native';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import InputCurrency from '../../components/InputCurrency';
import {colors} from '../../global';
import api from '../../services/api';
import {
  Container,
  Content,
  ScrollViewStyled,
  ViewScroll,
  HeaderProfile,
  HeaderImage,
  ImageUser,
  Icon,
  ModalContainer,
  ModalCard,
  ModalTitle,
  ModalButton,
  ModalButtonText,
  ModalOption,
  ModalSelection,
} from './styles';

const Item = props => {
  const {goBack} = props.navigation;
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();
  const [resizing, setResizing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMediaVisible, setModalMediaVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertOk, setShowAlertOk] = useState(false);
  const [item, setItem] = useState();

  const schema = Yup.object().shape({
    title: Yup.string().required('Titulo obrigatório'),
    description: Yup.string().required('Descrição obrigatória'),
    stock: Yup.string().required('Estoque obrigatório'),
    value: Yup.string().required('Valor obrigatório'),
  });

  const uploadImage = useCallback(async file => {
    const upImage = await api
      .post('upload', file, {
        // onUploadProgress: progressEvent => {}
      })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      });
    return upImage;
  }, []);

  const handleSubmitData = useCallback(
    async data => {
      if (!item && !imageData) {
        setShowAlert(true);
        return;
      }
      try {
        setLoading(true);
        let imageUrl = '';
        if (item && !imageData) imageUrl = item.banner;
        else imageUrl = await uploadImage(imageData);
        if (item) {
          await api.put(`/promotion/${item.id}`, {...data, banner: imageUrl});
        } else {
          await api.post('/promotion', {...data, banner: imageUrl});
        }
        setShowAlertOk(true);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    },
    [imageData, uploadImage, item],
  );

  const handleImage = useCallback(({response, typeAction}) => {
    if (response.didCancel) {
    } else if (response.error) {
    } else if (response.customButton) {
    } else {
      setLoading(true);
      const {originalRotation, type, uri} = response;

      setImage(null);
      setResizing(true);
      var newWidth = 720;
      var newHeight = 720;
      var compressFormat = type === 'image/png' ? 'PNG' : 'JPEG';
      var quality = 70;
      var rotation = 360;
      var outputPath = null;

      if (typeAction === 'Tirar foto') {
        if (originalRotation === 90) {
          rotation = 90;
        } else if (originalRotation === 270) {
          rotation = -90;
        }
      }

      ImageResizer.createResizedImage(
        uri,
        newWidth,
        newHeight,
        compressFormat,
        quality,
        rotation,
        outputPath,
        compressFormat === 'JPEG' ? true : false,
      )
        .then(resp => {
          setResizing(false);
          requestAnimationFrame(async () => {
            setImage({...resp, type});
            const fd = new FormData();
            fd.append('file', {...resp, type});
            setImageData(fd);
            setLoading(false);
          });
        })
        .catch(err => {
          console.log(err);
          setResizing(false);
          setLoading(false);
        });
    }
  }, []);

  const getImage = useCallback(
    typeAction => {
      const options = {
        title: 'Selecione a imagem',
        takePhotoButtonTitle: 'Tirar foto',
        chooseFromLibraryButtonTitle: 'Selecionar da galeria',
        cancelButtonTitle: 'Cancelar',
        storageOptions: {privateDirectory: true},
      };

      if (typeAction === 'Tirar foto') {
        try {
          launchCamera(options, response =>
            handleImage({response, typeAction}),
          );
        } catch (err) {}
      } else {
        try {
          launchImageLibrary(options, response =>
            handleImage({response, typeAction}),
          );
        } catch (err) {}
      }
    },
    [handleImage],
  );

  useEffect(() => {
    setLoading(true);
    if (props && props.route && props.route.params && props.route.params.item) {
      setItem(props.route.params.item);
    }
    setLoading(false);
  }, [props]);

  return (
    <Container>
      <Header
        action={() => goBack()}
        icon="arrow-left"
        title="Adicionar promoção"
      />
      <ViewScroll>
        <ScrollViewStyled contentContainerStyle={{flexGrow: 1}}>
          <Content>
            {loading ? (
              <Loading />
            ) : (
              <Formik
                initialValues={{
                  title: item && item.title ? item.title : '',
                  description: item && item.description ? item.description : '',
                  value: item && item.value ? item.value : 0,
                  stock: item && item.stock ? item.stock : 0,
                }}
                validationSchema={schema}
                onSubmit={handleSubmitData}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                }) => (
                  <>
                    <HeaderProfile>
                      <HeaderImage
                        onPress={() => {
                          setModalMediaVisible(true);
                        }}>
                        {image || (item && item.banner) ? (
                          <ImageUser
                            source={
                              image
                                ? image
                                : item && item.banner
                                ? {uri: item.banner}
                                : null
                            }
                          />
                        ) : (
                          <Icon
                            name="camera"
                            size={35}
                            color={colors.primary_correct}
                          />
                        )}
                      </HeaderImage>
                    </HeaderProfile>
                    <Input
                      name="title"
                      icon="event"
                      placeholder={'Título'}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                      error={errors.title}
                    />
                    <Input
                      name="description"
                      icon="docs"
                      placeholder={'Digite a descrição'}
                      multiline
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                      onSubmitEditing={handleSubmit}
                      error={errors.description}
                    />
                    <Input
                      name="stock"
                      icon="docs"
                      placeholder={'Digite o estoque'}
                      keyboardType="numeric"
                      onChangeText={handleChange('stock')}
                      onBlur={handleBlur('stock')}
                      value={`${values.stock}`}
                      onSubmitEditing={handleSubmit}
                      error={errors.stock}
                    />
                    <InputCurrency
                      value={values.value}
                      onChangeValue={val => setFieldValue('value', val)}
                      unit="R$"
                      delimiter=","
                      separator="."
                      precision={2}
                      returnKeyType="send"
                      // onChangeText={(formattedValue) => {
                      //   console.log(formattedValue); // $2,310.46
                      // }}
                    />
                    <Button icon="check" onPress={handleSubmit}>
                      Salvar
                    </Button>
                  </>
                )}
              </Formik>
            )}

            <ModalSelection
              animationType="fade"
              visible={modalMediaVisible}
              transparent
              callback={data => {
                setModalMediaVisible(false);

                if (data) {
                  requestAnimationFrame(() => {
                    getImage(data);
                  });
                }
              }}>
              <ModalContainer>
                <ModalCard>
                  <ModalTitle>{'Selecione uma foto da promoção'}</ModalTitle>
                  <ModalOption
                    onPress={() => {
                      setModalMediaVisible(false);

                      requestAnimationFrame(() => {
                        getImage('Tirar foto');
                      });
                    }}>
                    <ModalButtonText>{'Tirar foto'}</ModalButtonText>
                  </ModalOption>
                  <ModalOption
                    onPress={() => {
                      setModalMediaVisible(false);

                      requestAnimationFrame(() => {
                        getImage('Selecionar da galeria');
                      });
                    }}>
                    <ModalButtonText>{'Selecionar da galeria'}</ModalButtonText>
                  </ModalOption>
                  <ModalButton onPress={() => setModalMediaVisible(false)}>
                    <ModalButtonText>{'CANCELAR'}</ModalButtonText>
                  </ModalButton>
                </ModalCard>
              </ModalContainer>
            </ModalSelection>
            <AwesomeAlert
              show={showAlertOk}
              showProgress={false}
              title={'Salvo com sucesso, atualize a lista de promoções'}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText={'Ok'}
              confirmButtonColor={colors.primary}
              onConfirmPressed={() => {
                setShowAlertOk(false);
                navigation.goBack();
              }}
            />
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title={'Selecione uma imagem'}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText={'Tentar novamente'}
              confirmButtonColor={colors.primary}
              onConfirmPressed={() => {
                setShowAlert(false);
              }}
            />
          </Content>
        </ScrollViewStyled>
      </ViewScroll>
    </Container>
  );
};

export default Item;
