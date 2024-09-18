import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';

const AIsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/*burada
            bi notification
            bi 'AI Ekibimiz' yazısı
            bi account
           eklenecek*/}
      </View>
      <View style={styles.containerBox1}>
        <TextInput placeholder={'AI ara'}></TextInput>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.box1}></View>
        <View style={styles.box1}></View>
        <View style={styles.box1}></View>
      </ScrollView>
      <View style={styles.bottomBar}>{/*ALT BAR EKLENECEK*/}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    width: 300,
    height: 300,
    backgroundColor: 'lightblue',
    marginBottom: 5,
  }
})

export default AIsScreen;
