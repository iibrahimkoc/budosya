import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import LinearGradient from 'react-native-linear-gradient';

const storage = new MMKV();

const BlogInfoScreen = ({ navigation }) => {

  const token = storage.getString('token');
  const blog_id = storage.getNumber('blog_id');

  const [blogInfo, setBlogInfo] = useState([])
  const [replaceTextData, setReplaceTextData] = useState([]);

  const blogInfoFunction = async () => {
    try {
      const blogInfoResponse = await fetch(`https://aigency.dev/api/v1/blog-inside/?access_token=${token}&blog_id=${blog_id}`,{
        method: "GET",
      });
      const blogInfoData = await blogInfoResponse.json();
      setBlogInfo(blogInfoData);
      console.log(11122)
      console.log(blogInfoData);
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    blogInfoFunction()
  },[token, blog_id])




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            storage.delete("blog_id")
            navigation.goBack()
          }}>
          <Image source={require("../assets/images/arrowBack.png")} style={styles.headerIcon}></Image>
        </TouchableOpacity>
        <Text style={styles.title}>BLOG DETAY</Text>
        <TouchableOpacity >
          <Image source={require("../assets/images/share.png")} style={styles.headerIcon}></Image>
        </TouchableOpacity>
      </View>
      <LinearGradient colors={['rgb(184,86,196)', 'rgb(121,119,243)']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                      style={{width: "100%", height: 2}} />
      <ScrollView>
        <View style={styles.blogInfoBox}>
          <Text style={{color: "white"}}>{replaceTextData}</Text>
        </View>
      </ScrollView>
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
    backgroundColor: "rgb(12,15,22)",
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white"
  }
})

export default BlogInfoScreen;
