import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CreditProcess = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/images/arrowBack.png")} style={styles.headerIcon}></Image>
        </TouchableOpacity>
        <Text style={styles.headerText}>KREDİ İŞLEMLERİ</Text>
        <View style={styles.headerIcon}></View>
      </View>
      <LinearGradient colors={['rgb(184,86,196)', 'rgb(121,119,243)']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                      style={{width: "100%", height: 2}} />
      <Text style={styles.title}>Credit Process</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(12,15,22)",
  },
  header:{
    width: '100%',
    paddingHorizontal: '6%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: 'bold',
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
})
export default CreditProcess;
