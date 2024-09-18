import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forgot your password</Text>
      <Button title={"geri git"} onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})

export default ForgotPasswordScreen;
