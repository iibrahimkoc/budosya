import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';

const AIsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('NotificationScreen')}>
          <Image source={require('../assets/images/notification.png')} style={styles.notificationIcon}/>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>AI EKİBİMİZ</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Image source={require('../assets/images/profile.png')} style={styles.notificationIcon}/>
        </TouchableOpacity>
      </View>
      <View style={styles.inputBox}>
        <TextInput placeholder={'AI ara'} style={styles.input}></TextInput>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.aiBox}>
        <TouchableOpacity style={styles.box1}>
          <View style={styles.photo}>
            <Image resizeMethod={'auto'} source={require('../assets/images/lawyer.png')} style={styles.photoImage}></Image>
          </View>
          <View style={styles.stick}></View>
          <View style={styles.aiTextBox}>
            <View style={styles.aiInfoHeaderBox}>
              <Text style={styles.aiInfoHeader}>ALPARSLAN</Text>
              <Text style={styles.aiInfoHeader}>-AVUKAT-</Text>
            </View>
            <View style={styles.aiInfoTextBox}>
              <Text style={styles.aiInfoText}>Hukuk işleri ile aklına takılan her noktada Alparslan yanında</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box1}>
          <View style={styles.photo}>
            <Image resizeMethod={'resize'} source={require('../assets/images/diyetisyen.png')} style={styles.photoImage}></Image>
          </View>
          <View style={styles.stick}></View>
          <View style={styles.aiTextBox}>
            <View style={styles.aiInfoHeaderBox}>
              <Text style={styles.aiInfoHeader}>ECRİN</Text>
              <Text style={styles.aiInfoHeader}>-DİYETİSYEN-</Text>
            </View>
            <View style={styles.aiInfoTextBox}>
              <Text style={styles.aiInfoText}>Diyet işleri ile aklına takılan her noktada Ecrin yanında</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box1}>
          <View style={styles.photo}>
            <Image resizeMethod={'auto'} source={require('../assets/images/chef.png')} style={styles.photoImage}></Image>
          </View>
          <View style={styles.stick}></View>
          <View style={styles.aiTextBox}>
            <View style={styles.aiInfoHeaderBox}>
              <Text style={styles.aiInfoHeader}>NEVZAT</Text>
              <Text style={styles.aiInfoHeader}>-AŞÇI-</Text>
            </View>
            <View style={styles.aiInfoTextBox}>
              <Text style={styles.aiInfoText}>Yemek konusunda aklına takılan her noktada Nevzat yanında</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.box1}></View>
        <View style={styles.box1}></View>
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
  header:{
    width: '100%',
    paddingHorizontal: '6%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "rgb(130,136,174)",
  },
  notificationButton: {
    width: 40,
    height: 40,
  },
  notificationIcon: {
    width: 35,
    height: 39,
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileButton: {

  },
  inputBox:{
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width: '90%',
    height: 40,
    borderWidth: 2,
    borderColor: "rgb(130,136,174)",
    borderRadius: 10,
    paddingLeft: 10,
  },

  aiBox: {
    width: '100%',


  },
  box1: {
    marginHorizontal: '5%',
    width: '90%',
    paddingVertical: '5%',
    height: 150,
    borderWidth: 2,
    borderColor: "rgb(130,136,174)",
    backgroundColor: "rgb(248,246,246)",
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  photo: {
    height: '100%',
    width: '30%',

  },
  photoImage: {
    height: '100%',
    width: '100%',
  },
  stick: {
    height: '90%',
    borderRightWidth: 2,
    borderColor: "rgb(132,138,175)",
    marginHorizontal: 10,
  },
  aiTextBox: {
    width: '60%',

  },
  aiInfoHeaderBox: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aiInfoHeader:{
    fontWeight: 'bold',
  },
  aiInfoTextBox: {
    height: 70,

    justifyContent: 'center',
  },
  aiInfoText: {
    textAlign: 'justify',

  }
})

export default AIsScreen;
