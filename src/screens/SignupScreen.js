import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Image, Alert} from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Geçersiz Email', 'Lütfen geçerli bir mail adresi giriniz.');
      return;
    }

    // FormData nesnesi oluşturuluyor
    const formData = new FormData();
    formData.append('name', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('terms_rules', 'checked');  // Şartlar ve Koşullar alanı eklendi

    try {
      const response = await fetch('https://aigency.dev/api/v1/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Başarılı', 'Kayıt işlemi başarılı!');
        navigation.navigate('AIsScreen');
      } else {
        Alert.alert('Hata', data.message || 'Kayıt işlemi başarısız oldu.');
      }
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.containerBox1}>
        <Text style={styles.headerText}>Sign Up</Text>
        <View style={styles.shape1}></View>
        <View style={styles.shape2}></View>
        <View style={styles.shape3}></View>
      </View>
      <View style={styles.containerBox2}>
        <View style={styles.containerBox}>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Kullanıcı Adı"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Şifre"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
          <Button title="Kayıt Ol" onPress={handleSignup} />
        </View>
        <Text style={styles.title} onPress={() => navigation.navigate('LoginScreen')}>Zaten bir hesabım var.</Text>
      </View>
    </View>

  );
}
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
    zIndex: 100
  },
  formContainer: {
    padding: 20,
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
  title:{
    marginVertical: 30,
    textDecorationLine: 'underline',
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

export default SignupScreen;
