import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Hata', 'Lütfen e-posta adresinizi girin.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);

    try {
      const response = await fetch('https://aigency.dev/api/v1/forgotPassword', {
        method: 'POST',
        headers: {},
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status) {
        Alert.alert('Başarılı', data.message || 'Şifre sıfırlama talebi gönderildi.');
      } else {
        Alert.alert('Hata', data.message || 'Şifre sıfırlama işlemi başarısız oldu.');
      }
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forgot your password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Şifremi Sıfırla" onPress={handleForgotPassword} />
      <Button title="Geri Git" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
  },
});

export default ForgotPasswordScreen;
