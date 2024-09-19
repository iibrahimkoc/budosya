import React, { useState } from 'react';
import {Text, SafeAreaView, StyleSheet, View, TextInput, Alert, Button, Image} from 'react-native';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLogined } = route.params;

  const validateEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Geçersiz Email', 'Lütfen geçerli bir mail adresi giriniz.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch('https://aigency.dev/api/v1/login/', {
        method: 'POST',
        headers: {},
        body: formData,
      });

      const data = await response.json();

      // Başarılı yanıt kontrolü
      if (response.ok && data.status) {
        Alert.alert('Başarılı', data.message || 'Giriş işlemi başarılı!');
        setIsLogined(true);
        // `access_token`'ı burada kullanabilirsiniz, örneğin saklamak için
        const token = data.access_token;

        const userData = await fetch()

        navigation.reset({
          index: 0,
          routes: [{ name: 'TabNavigator', params: { screen: 'AIsScreen' } }],
        });
      } else {
        // Hata durumunda gelen mesajı göster
        const errorMessage = data.message || 'Giriş işlemi başarısız oldu.';
        Alert.alert('Hata', errorMessage);
      }
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBox1}>
        <Text style={styles.headerText}>Login</Text>
        <View style={styles.shape1}></View>
        <View style={styles.shape2}></View>
        <View style={styles.shape3}></View>
      </View>
      <View style={styles.containerBox2}>
        <View style={styles.containerBox}>
          <View style={styles.inputBox}>
            <TextInput
              placeholder={'E-mail'}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              autoCapitalize="none" //ilk harf küçük
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder={'Password'}
              style={[styles.input, styles.passwordBox]}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          <Text style={styles.forgetPasswordButton} onPress={() => navigation.navigate('ForgotPasswordScreen')}>Şifremi unuttum</Text>
          <Button title={'Giriş'} onPress={validateEmail} />
        </View>

        <View style={styles.containerBox}>
          <View style={styles.stick}></View>
          <View style={styles.otherLoginBox}>
            <View style={styles.otherLogin}>
              <Image source={require('../assets/images/google.png')}
                     style={styles.image}/>
            </View>
            <View style={styles.otherLogin}>
              <Image source={require('../assets/images/apple-logo.png')}
                     style={styles.image}/>
            </View>
          </View>
          <Text style={styles.title} onPress={() => navigation.navigate('SignupScreen')}>Don't have account</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBox: {
    width: '70%',
  },
  containerBox1: {
    width: '100%',
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "rgb(91, 107, 207)",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: "rgb(91, 107, 207)",
  },
  containerBox2: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 50,
    fontFamily: 'arial',
    color: 'white',
    zIndex: 100,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 50,
    paddingRight: 10,
    fontSize: 20,
    color: 'black',
  },
  passwordBox: {
    paddingRight: 50,
  },
  forgetPasswordButton: {
    marginTop: 5,
    textAlign: 'right',
  },
  stick: {
    marginHorizontal: "20%",
    width: "60%",
    height: 1,
    backgroundColor: "rgb(6,18,83)",
    margin: 30
  },
  otherLoginBox: {
    justifyContent:  "center",
    flexDirection: 'row',

  },
  otherLogin: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    marginHorizontal: 10,

  },
  image: {
    width: '65%',
    height: '65%',
  },
  title: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginVertical: 20,
  },
  shape1:{
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: "rgb(98,116,221)",
    position: 'absolute',
    top: -250,
    right: -250,
  },
  shape2:{
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgb(105,121,221)",
    position: 'absolute',
    top: -200,
    right: -200,
  },
  shape3:{
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgb(110,125,221)",
    position: 'absolute',
    top: -150,
    right: -150,
  }
});

export default LoginScreen;
