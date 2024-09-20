import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  useWindowDimensions
} from 'react-native';

import {MMKV} from 'react-native-mmkv';
import LinearGradient from 'react-native-linear-gradient';


const storage = new MMKV();

const MessageHistoryScreen = ({navigation}) => {
  const [myChats, setMyChats] = useState([]);
  const token = storage.getString('token');

  const { width } = useWindowDimensions();

  const chats = async () => {
    try{
      const response = await fetch("https://aigency.dev/api/v1/my-chats?access_token=" + token,{
        method: 'GET',
      });
      const data = await response.json();
      setMyChats(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    chats();
  }, [token]);


  const isLargeScreen = width > 600;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>SOHBETLERİM</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('CreditProcess')}>
          <LinearGradient colors={['rgb(184,86,196)', 'rgb(121,119,243)']}
                          start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                          style={styles.creditBoxGradient} >
            <View style={styles.creditBox}>
              <Text style={styles.creditBoxText}>Kredilerim: 917,301</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <LinearGradient colors={['rgb(184,86,196)', 'rgb(121,119,243)']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                      style={{width: "100%", height: 2}} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.aiBox}
      >
        <View
          style={[styles.gridContainer, isLargeScreen && styles.gridContainerLarge]}
        >
          {myChats.length > 0 ?(
            myChats.map((chat, index) => (
              <TouchableOpacity key={index} style={[styles.box1, isLargeScreen ? styles.largeBox : styles.smallBox]}
                                onPress={() => {
                                  storage.set("ai_id", chat.ai_id);
                                  storage.set("ai_name", chat.ai_name);
                                  storage.set("ai_desc", chat.ai_desc);
                                  navigation.navigate('ResumeMessageScreen');
                                }}>
                <View style={styles.photo}>
                  <Image resizeMethod={'auto'} source={{uri: 'https://aigency.dev/public_uploads/66731bda984b7.jpg'}} style={styles.photoImage}></Image>
                </View>
                <View style={styles.stick}></View>
                <View style={styles.aiTextBox}>
                  <View style={styles.aiInfoHeaderBox}>
                    <Text style={styles.aiInfoHeaderName}>{chat.ai_name.toUpperCase()}</Text>
                    <Text style={styles.aiInfoHeaderDesc}>{chat.ai_desc}</Text>
                  </View>
                  <View style={styles.aiInfoTextBox}>
                    <View style={styles.aiInfoTextBoxContainer}>
                      <Image source={{uri: 'https://aigency.dev/img/chat.png'}} style={styles.uriImage}></Image>
                      <Text style={styles.aiInfoText}>{chat.total_chats} Sohbet</Text>
                    </View>
                    <View style={styles.aiInfoTextBoxContainer}>
                      <Image source={{uri: 'https://aigency.dev/img/message.png'}} style={styles.uriImage}/>
                      <Text style={styles.aiInfoText}>{chat.total_messages} Mesaj</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}> Yükleniyor...</Text> // Veri yüklenirken gösterilecek mesaj
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  creditBoxGradient: {
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 5,
  },
  creditBox: {
    backgroundColor: "rgb(32,33,37)",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  creditBoxText: {
    color: "white",
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
    color: "#fff",
  },
  aiBox: {
    width: '100%',
    display: 'flex',
  },
  gridContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
  },
  gridContainerLarge: {
    flexDirection: "row",
    flexWrap: 'wrap',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  box1: {
    height: 150,
    borderWidth: 2,
    borderColor: "rgb(34,42,63)",
    backgroundColor: "rgb(19,24,36)",
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    display: 'flex',
  },
  smallBox: {
    width: '90%',
    marginHorizontal: "5%"
  },
  largeBox:{
    width: '48%',
  },
  photo: {
    height: '100%',
    width: '30%',
  },
  photoImage: {
    height: '100%',
    width: '100%',
    borderRadius: 200,
  },
  stick: {
    height: '80%',
    borderRightWidth: 2,
    borderColor: "rgb(132,138,175)",
    marginHorizontal: 10,
  },
  aiTextBox: {
    flex: 2,
    display: "flex",
    height: 100,
    flexDirection: 'column',
    justifyContent: "space-between",
  },
  aiInfoHeaderBox: {
    width: '100%',
    height: "auto",
    flexDirection: 'column',
  },
  aiInfoHeaderName: {
    width: '50%',
    fontWeight: 'bold',
    color: '#fff',
  },
  aiInfoHeaderDesc:{
    marginTop: 2,
    width: '100%',
    fontWeight: '600',
    color: 'rgb(110,135,201)',
  },
  aiInfoTextBoxContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiInfoTextBox: {
    width: '100%',
    height: "auto",
    flexDirection: "row",
    display: 'flex',
    justifyContent: 'space-around',
  },
  aiInfoText: {
    textAlign: 'justify',
    color: '#fff',
  },
  uriImage: {
    width: 25,
    height: 25,
  }
})

export default MessageHistoryScreen
