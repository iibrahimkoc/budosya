import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput, Image,
} from 'react-native';
import { MMKV } from 'react-native-mmkv';
import LinearGradient from 'react-native-linear-gradient';

const storage = new MMKV();

const NewTalkScreen = ({ navigation }) => {
  const ai_name = storage.getString("ai_name");
  const ai_id = storage.getNumber("ai_id");
  const chat_id = storage.getString("chat_id");

  const [responseData, setResponseData] = useState('');
  const [token, setToken] = useState(storage.getString("token"));
  const [myChat, setMyChat] = useState(null);
  const [myMessage, setMyMessage] = useState('');

  const flatListRef = useRef(null);

  useEffect(() => {
    const newChatMessages = async () => {
      const newMessageFormData = new FormData();
      newMessageFormData.append("access_token", token);
      newMessageFormData.append("ai_id", ai_id);
      try {
        const newMessageResponse = await fetch("https://aigency.dev/api/v1/newChat", {
          method: 'POST',
          body: newMessageFormData,
        });
        const newMessageData = await newMessageResponse.json();
        setMyChat(newMessageData);
        console.log(newMessageData);
      } catch (error) {
        console.log(error);
      }
    };
    newChatMessages();
  }, [ai_id, token]);

  const sendMessage = async () => {
    const sendFormData = new FormData();
    sendFormData.append('access_token', token);
    sendFormData.append('chat_id', chat_id);
    sendFormData.append('message', myMessage);

    try {
      const sendResponse = await fetch("https://aigency.dev/api/v1/sendMessage", {
        method: 'POST',
        body: sendFormData,
      });

      if (!sendResponse.ok) {
        throw new Error(`HTTP error! status: ${sendResponse.status}`);
      }

      const sendData = await sendResponse.json();
      if (sendData && sendData.answer) {
        let veri = myChat?.messages || [];
        let aiMessages = sendData.answer;
        veri.push(aiMessages);
        setMyChat({ ...myChat, messages: veri });
        flatListRef.current?.scrollToEnd({ animated: true });
      } else {
        console.log("Yanıt veri yapısı beklenmedik.");
      }

    } catch (error) {
      console.log("Mesaj gönderme hatası:", error);
    }
  };

  const renderMessageItem = ({ item }) => (
    <View key={item.id} style={item.from === 'user' ? styles.userMessageBox : styles.aiMessageBox}>
      <View style={item.from === 'assistant' ? styles.aiMessage : styles.userMessage}>
        <Text style={{color: "white"}}>{item.message}</Text>
      </View>
    </View>
  );

  const myChatAdd = (myMsg) =>{
    let veri = myChat.messages;
    let myMessage = {message : myMsg, from: "user"}
    veri.push(myMessage);
    myChat.messages = veri;
    flatListRef.current?.scrollToEnd({ animated: true });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.goBack();
            storage.delete("chat_id");
            setMyChat(null);

          }}>
          <Image source={require("../assets/images/arrowBack.png")} style={styles.backButton}></Image>
        </TouchableOpacity>
        <Text style={styles.title}>{ai_name}</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {

          }}
        >
          <Image source={require("../assets/images/downloadButton.png")} style={styles.downloadButton}></Image>
        </TouchableOpacity>
      </View>
      <LinearGradient colors={['rgb(184,86,196)', 'rgb(121,119,243)']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                      style={{width: "100%", height: 2}} />

      {myChat ? (
        <FlatList
          ref={flatListRef}
          data={myChat.messages?.filter((item) => item.from === "user" || item.from === "assistant")}
          renderItem={renderMessageItem}
          keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      ) : (
        <View style={styles.containerBox}><Text>Yükleniyor...</Text></View>
      )}

      <LinearGradient colors={['rgb(184,86,196)', 'rgb(121,119,243)']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                      style={{width: "100%", height: 2, marginBottom: 10}} />
      <View style={styles.sendMessageBox}>
      <LinearGradient colors={['rgb(19,20,36)', 'rgb(24,35,61)']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                      style={{width: "77%", borderRadius: 5, borderWidth: 2, borderColor: "rgb(74,79,96)"}}
      >
        <TextInput
          placeholder={'Mesajınızı buraya yazın'}
          placeholderTextColor={"rgb(165,167,211)"}
          style={styles.input}
          value={myMessage}
          onChangeText={(myMessage) => setMyMessage(myMessage)}
        />
      </LinearGradient>
      <LinearGradient colors={['rgb(18,19,36)', 'rgb(40,82,138)']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                      style={{width: "18%", borderRadius: 5,display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <TouchableOpacity
          style={styles.sendMessageButtonBox}
          onPress={() => {
            console.log("bu gönderilecek mesaj: ", myMessage);
            myChatAdd(myMessage);
            sendMessage();
            setMyMessage(null);
          }}>
          <Text style={{color:"white", fontWeight:600}}>Gönder</Text>
        </TouchableOpacity>
      </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(12,15,22)",
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    alignItems: 'center',
    height: 60,
    backgroundColor: "rgb(12,15,22)",
  },
  headerButton: {
    width: 35,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: 30,
    height: 30,
  },
  downloadButton: {
    width: 35,
    height: 35,
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
    color: "#fff",
  },
  userMessageBox: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  userMessage: {
    maxWidth: '70%',
    height: 'auto',
    backgroundColor: 'rgb(20,22,30)',
    borderWidth: 2,
    borderColor: "rgb(79,28,121)",
    padding: 20,
    borderRadius: 15,
    borderBottomRightRadius: 5,
  },
  aiMessageBox: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  aiMessage: {
    maxWidth: '85%',
    height: 'auto',
    backgroundColor: 'rgb(33,37,52)',
    padding: 20,
    borderRadius: 15,
    borderBottomLeftRadius: 5,
  },
  sendMessageBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    color: "white",
    paddingLeft: 10,
  },
  sendMessageButtonBox: {
    width: '100%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default NewTalkScreen;
