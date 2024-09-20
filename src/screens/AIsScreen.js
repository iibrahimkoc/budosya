import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableNativeFeedback,
  ActivityIndicator,
  useWindowDimensions,
  RefreshControl
} from 'react-native';

import { MMKV } from 'react-native-mmkv';
import LinearGradient from 'react-native-linear-gradient';
import {addAbortListener} from 'events';

const storage = new MMKV();

const AIsScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
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
      });
      const getThreadData = await getThreadResponse.json();
      storage.set("chat_id", getThreadData.chat_id);
    }
    catch(error){
      console.log(error);
    }
  };

  const [aiListTeam, setAiListTeam] = useState([]);

  const aiTeamList = async () => {
    try{
      const response = await fetch("https://aigency.dev/api/v1/ai-team-list/?access_token=" + token,{
        method: 'GET',
      });
      const aiTeamListData = await response.json();
      //console.log(aiTeamListData);
      setAiListTeam(aiTeamListData);
    }
    catch(error) {
      console.log( "hata mesajı ",error);
    }
  };

  const [packageAiList, setPackageAiList] = useState([]);
  
  const pricingList = async () => {
    try {
      const pricingListResponse = await fetch("https://aigency.dev/api/v1/pricing-list?access_token="+token,{
        method: 'GET',
      });
      const pricingListData = await pricingListResponse.json();
      const filterPricingListData = pricingListData.filter((item) => item.package_name == "VIP PACKAGE")[0];
      //console.log("1111", filterPricingListData);
      if (filterPricingListData && filterPricingListData.package_ai_list) {
        const packageAIList = filterPricingListData.package_ai_list;
        setPackageAiList(packageAIList);
        console.log("package_ai_list:", packageAIList);
      } else {
        console.log("package_ai_list bulunamadı.");
      }
    }
    catch(error) {
      console.log(error);
    }
  };


  useEffect(() => {
    aiTeamList();
    pricingList();
  },[token]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedAI, setSelectedAI] = React.useState('');

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      aiTeamList();
      setRefreshing(false);
    }, 2000);
  }, [token]);

  const isLargeScreen = width > 600;

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.aiBox}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={"white"}
            colors={"white"}
          />
        }
      >
        <View
          style={[styles.gridContainer, isLargeScreen && styles.gridContainerLarge]}
        >
          {aiListTeam.length > 0 ? (
            aiListTeam.map((aiListTeam,index) => (
              <TouchableOpacity
                key={index}
                style={[styles.box1, isLargeScreen ? styles.largeBox : styles.smallBox]}
                onPress={() => {
                  setModalVisible(true)
                  setSelectedAiId(aiListTeam.ai_id)
                  setSelectedAI(aiListTeam.ai_name)
                }}
              >
                <Image source={require("../assets/images/vip.png")} style={{width: 35,height: 35,position: 'absolute',right: 20,top: 0, display: aiListTeam.is_vip ? "flex" : "none"}} resizeMode={'cover'} />
                <View style={styles.photo}>
                  <Image source={{uri: 'https://aigency.dev/public_uploads/66731bda984b7.jpg'}} style={styles.photoImage}></Image>
                </View>
                <View style={styles.stick}></View>
                <View style={styles.aiTextBox}>
                  <Text style={styles.aiInfoHeaderName}>{aiListTeam.ai_name.toUpperCase()}</Text>
                  <Text numberOfLines={3} style={styles.aiInfoHeaderDesc}>{aiListTeam.ai_desc}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={'#ffffff'} />
            </View>
          )}
        </View>
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
  loadingContainer: {
    width: '100%',
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
    padding: 10,
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
    width: '30%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoImage: {
    width: '100%',
    aspectRatio: 1,
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
    justifyContent: "center",
  },
  aiInfoHeaderName: {
    width: '100%',
    fontWeight: 'bold',
    color: '#fff',
  },
  aiInfoHeaderDesc:{
    marginTop: 10,
    width: '100%',
    color: 'rgb(255,255,255)',
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
