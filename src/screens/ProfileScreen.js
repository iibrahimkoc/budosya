import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const ProfileScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = React.useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [selectedLanguage, setSelectedLanguage] = useState('Türkçe');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.editProfile}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.editProfileButton} />
        </View>
        <View style={styles.logOut}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.logOutButton} />
        </View>
        <View style={styles.profileInfoBox}>
          <View style={styles.profilePhotoBox} />
          <Text style={styles.profileUsername}>İbrahim Koç</Text>
          <Text style={styles.profileEmail}>sewebko@gmail.com</Text>
        </View>
      </View>
      <View style={styles.settings}>
        <View style={styles.settingBox}>
          {/* MODAL AÇILACAK */}
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectedLanguageButton}>
            <Text style={styles.settingBoxText}>Dil Seçin</Text>
            <Text>{selectedLanguage}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingBox}>
          <TouchableOpacity onPress={() => setIsEnabled(!isEnabled)} style={styles.darkModeButton}>
            <Text style={styles.settingBoxText}>Karanlık Mod</Text>
            <Switch
              trackColor={{false: '#767577', true: 'rgb(130,136,174)'}}
              thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor={'#d8d8d8'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            ></Switch>
          </TouchableOpacity>
        </View>

        <View style={styles.settingBox}>
          <TouchableOpacity onPress={() => navigation.navigate('LanguageSetting')} style={styles.settingBoxButton}>
            <Text style={styles.settingBoxText}>Dil Seçin</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingBox}>
          <TouchableOpacity onPress={() => navigation.navigate('LanguageSetting')} style={styles.settingBoxButton}>
            <Text style={styles.settingBoxText}>Dil Seçin</Text>
          </TouchableOpacity>
        </View>

      </View>

      <Modal
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalBox}>
                <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }
                  style={styles.pickerStyle}
                  itemStyle={styles.pickerItemStyle}
                  >
                  <Picker.Item label="عربي" value="عربي" />
                  <Picker.Item label="Türkçe" value="Türkçe" />
                  <Picker.Item label="English" value="English" />
                </Picker>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
  },
  profileContainer: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'rgb(130,136,174)',
    position: 'relative',
  },
  editProfile:{
    width: 50,
    height: 50,
    backgroundColor: 'rgb(130,136,174)',
    borderRadius: 25,
    position: 'absolute',
    left: 10,
    top: 10,
  },
  editProfileButton: {
    width: '100%',
    height: '100%',
  },
  logOut: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(130,136,174)',
    borderRadius: 25,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  logOutButton: {
    width: '100%',
    height: '100%',
  },
  profileInfoBox: {
    margin: 'auto',
    alignItems: 'center',
  },
  profilePhotoBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgb(130,136,174)',
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profileUsername: {
    fontSize: 20,
    marginTop: 10,
    letterSpacing: 0.2,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 15,
  },
  settings: {
    gap: 10,
    marginVertical: 20,
  },
  settingBox: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: 'rgb(130,136,174)',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  settingBoxText: {
    fontSize: 18,
  },
  selectedLanguageButton:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  darkModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  modalBox:{
    width: '100%',
    height: 'auto',
    //backgroundColor: 'rgb(130,136,174)',

  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Modalın alt kısımda görünmesini sağlar
  },
  pickerStyle: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#f3f3f3',
    borderWidth: 1,
    borderColor: 'rgb(130,136,174)',
    borderRadius: 30,
  },
  pickerItemStyle: {
    width: '100%',
    height: 200,
    fontSize: 25,
  },
});

export default ProfileScreen;
