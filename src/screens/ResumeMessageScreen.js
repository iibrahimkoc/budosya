import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView, useWindowDimensions,
} from 'react-native';

import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const ResumeMessageScreen = ({navigation}) => {

  const ai_id = storage.getNumber("ai_id");
  const ai_name = storage.getString("ai_name");
  const ai_desc = storage.getString("ai_desc");
  const token = storage.getString("token");

  const [myChats, setMyChats] = useState([]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    const chats = async () => {
      try{
        const myToken = storage.getString("token");
        const response = await fetch("https://aigency.dev/api/v1/view-chats?access_token="+ myToken +"&ai_id=" + ai_id,{
          method: 'GET',
        });
        const data = await response.json();
        console.log(data);
        setMyChats(data);
      }
      catch (error) {
        console.log(error);
      }
    };
    chats();
  }, [ai_id]);

  const getThread = async () => {
    const getThreadBody = new FormData();
    getThreadBody.append("access_token", token);
    getThreadBody.append("ai_id", ai_id);
    try{
      const getThreadResponse = await fetch("https://aigency.dev/api/v1/newChat", {
        method: 'POST',
        body: getThreadBody,
      })

      const getThreadData = await getThreadResponse.json();
      storage.set("chat_id", getThreadData.chat_id);
    }
    catch(error){
      console.log(error);
    }
  }

  const isLargeScreen = width > 600;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity  onPress={() => navigation.goBack()} style={styles.profileButton}>
          <Image source={require("../assets/images/arrowBack.png")} style={styles.profileIcon}></Image>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{String(ai_name).toUpperCase()}</Text>
          <Text style={styles.aiDescTitle}>{ai_desc}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}
                          onPress={() => {
                            getThread();
                            navigation.navigate('NewTalkScreen');
                          }}>
          <Image source={require('../assets/images/add.png')} style={styles.profileIcon}/>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.aiBox}>
        <View
          style={[styles.gridContainer, isLargeScreen && styles.gridContainerLarge]}
        >
          {myChats.length > 0 ?(
            myChats.map((chat, index) => (

              <TouchableOpacity style={[styles.box1, isLargeScreen ? styles.largeBox : styles.smallBox]}
                                onPress={() => {
                                  storage.set("chat_id", chat.chat_id);
                                  storage.set("download_docx", chat.download_docx);
                                  storage.set("download_pdf", chat.download_pdf);
                                  storage.set("download_txt", chat.download_txt);
                                  navigation.navigate('ResumeTalkScreen');
                                }}>
                <View style={styles.photo}>
                  <Image resizeMethod={'auto'} source={{uri: "https://aigency.dev/public_uploads/66731bda984b7.jpg"}} style={styles.photoImage}></Image>
                </View>
                <View style={styles.stick}></View>
                <View style={styles.aiTextBox}>
                  <View style={styles.aiInfoHeaderBox}>
                    <Text style={styles.aiInfoHeaderName}>{chat.chat_name}</Text>
                    <Text style={styles.aiInfoHeaderDesc}></Text>
                  </View>
                  <View style={styles.aiInfoTextBox}>
                    <Text style={styles.aiInfoText}>{chat.last_message}</Text>
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
    borderBottomWidth: 1,
    borderColor: "rgb(130,136,174)",
  },
  back: {
    color: "#fff",
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  aiDescTitle: {
    color: 'rgb(110,135,201)',
    fontSize: 13,
    textAlign: 'center',
  },
  profileButton: {
    width: 30,
    height: 30,
  },
  profileIcon:{
    width: 30,
    height: 30,
  },
  aiBox: {
    width: '100%',
    paddingTop: 20,
  },
  gridContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
  },
  gridContainerLarge: {
    flexDirection: "row",
    flexWrap: 'wrap',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 100
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
    height: "auto",
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInfoHeaderName: {
    width: '50%',
    fontWeight: 'bold',
    color: "white"
  },
  aiInfoHeaderDesc:{
    width: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: "white"
  },
  aiInfoTextBox: {
    height: 70,
    justifyContent: 'center',
  },
  aiInfoText: {
    textAlign: 'justify',
    color: "white"
  }
})
export default ResumeMessageScreen;
