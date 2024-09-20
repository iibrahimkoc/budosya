import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput, Modal, TouchableNativeFeedback,
} from 'react-native';
import {UserInfo} from '../context/UserInfo';
import { MMKV } from 'react-native-mmkv';
import LinearGradient from 'react-native-linear-gradient';

const storage = new MMKV();

const AIsScreen = ({ navigation }) => {
  const token = storage.getString('token');
  const [selectedAiId, setSelectedAiId] = useState(null);

  const getThread = async () => {

    const getThreadBody = new FormData();
    getThreadBody.append("access_token", token);
    getThreadBody.append("ai_id", selectedAiId);

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
  useEffect(() => {
    const aiTeam = async () => {
      const myToken = token;
      try{
        const response = await fetch("https://aigency.dev/api/v1/ai-team-list/?access_token=" + myToken,{
          method: 'GET',
        })

        const data = await response.json();
      }
      catch(error) {
        console.log( "hata mesajı ",error);
      }
    };
    aiTeam();
  }, [token]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedAI, setSelectedAI] = React.useState('');



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>AI EKİBİMİZ</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('BlogsScreen')}>
          <Image source={require('../assets/images/blog.png')} style={styles.profileIcon}/>
        </TouchableOpacity>
      </View>

      <LinearGradient colors={['rgb(184,86,196)', 'rgb(121,119,243)']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                      style={{width: "100%", height: 2}} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.aiBox}>
        <UserInfo setModalVisible={setModalVisible} setSelectedAI={setSelectedAI} setSelectedAiId={setSelectedAiId}></UserInfo>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
          <TouchableNativeFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableNativeFeedback>
                <View style={styles.modalBox}>
                  <View style={styles.modalChatBox}>
                    <TouchableOpacity style={styles.newChatBox}
                                      onPress={() => {
                                        getThread();
                                        storage.set("selectedAI", selectedAI);
                                        storage.set("ai_id", selectedAiId);
                                        navigation.navigate('NewTalkScreen',);
                                        setModalVisible(false);
                                      }}>
                      <Text>Yeni sohbet oluştur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lastChatbox}
                                      onPress={() =>{
                                        storage.set("ai_name", selectedAI);
                                        storage.set("ai_id", selectedAiId);
                                        navigation.navigate('ResumeMessageScreen');
                                        setModalVisible(false);
                                      }}>
                      <Text>Önceki sohbetleri görüntüle</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalCloseBox}>
                    <TouchableOpacity style={styles.closeModal} onPress={() => setModalVisible(false)}>
                      <Text>iptal et</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          </TouchableNativeFeedback>
      </Modal>

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
    backgroundColor: "rgb(12,15,22)",
  },
  profileIcon: {
    width: 35,
    height: 35,
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
    color: "#fff",
  },

  aiBox: {
    width: '100%',
    backgroundColor: "rgb(12,15,22)",
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
  },
  modalOverlay:{
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalBox:{
    width: '100%',
    height: 'auto',
    padding: '3%',

  },
  modalChatBox:{
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  newChatBox:{
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lastChatbox: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: "rgb(132,138,175)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalCloseBox:{
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
  },
  closeModal:{
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default AIsScreen;
