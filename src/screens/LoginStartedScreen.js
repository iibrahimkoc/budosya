import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoginStartedScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerBox1}>
        <Image
          style={styles.Image}
          source={require('../assets/images/647b9f6b097af.png')} />
      </View>
      <View style={styles.containerBox2}>
        <Text style={styles.headerTitle}>Smart Chat</Text>
        <Text style={styles.title}>Yazılımdan sağlığa kadar her cevap Smart Chat'te</Text>
        <TouchableHighlight style={styles.loginButton}
                            onPress={() => navigation.navigate("LoginScreen")}
        ><LinearGradient colors={['rgb(44,56,80)', 'rgb(61,81,147)']}
                         start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                         style={styles.buttonGradient}>
          <Text style={styles.text}>LOGIN</Text>
        </LinearGradient>
        </TouchableHighlight>
        <LinearGradient colors={['rgb(44,56,80)', 'rgb(61,81,147)']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.signupButton}>
          <TouchableOpacity style={styles.signupButtonBox}
                            onPress={() => navigation.navigate("SignupScreen")}
          >
            <Text style={styles.text}>SIGN UP</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgb(91, 107, 207)",
  },
  containerBox1: {
    width: '100%',
    height: "30%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerBox2: {
    width: '100%',
    height: "70%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: '70%',
  },
  headerTitle: {
    fontSize: 60,
    color: 'white',
  },
  title: {
    fontSize: 17,
    color: 'white',
    width: '70%',
    textAlign: 'center',
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Bungee-Regular',
  },
  loginButton: {
    width: "70%",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 25,
    marginTop: 50,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButton:{
    width: "70%",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  signupButtonBox:{
    width: '98%',
    height: '85%',
    backgroundColor: "rgb(91, 107, 207)",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default LoginStartedScreen;
