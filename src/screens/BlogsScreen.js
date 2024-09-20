import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MMKV} from 'react-native-mmkv';


const storage = new MMKV();

const BlogsScreen = ({ navigation }) => {

  const token = storage.getString('token');
  const [blogList, setBlogList] = useState([]);
  const blogListFunction = async () => {
    try {
      const blogListResponse = await fetch("https://aigency.dev/api/v1/blog-list/?access_token=" + token ,{
        method: "GET",
      })
      const blogListData = await blogListResponse.json();
      setBlogList(blogListData);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect( () => {
    blogListFunction()
  }, [token])


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/images/arrowBack.png")} style={styles.headerIcon}></Image>
        </TouchableOpacity>
        <Text style={styles.title}>BLOGLAR</Text>
        <View style={styles.headerIcon}></View>
      </View>

      <LinearGradient colors={['rgb(184,86,196)', 'rgb(121,119,243)']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                      style={{width: "100%", height: 2}} />

      <ScrollView>
        <View style={styles.blogList}>
          {blogList.length > 0 ?
            (blogList.map((blog,index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.blogListBox}
                  onPress={() => {
                    storage.set("blog_id", blog.blog_id);
                    navigation.navigate("BlogInfoScreen")
                  }}>
                  <Image source={{uri: blog.blog_img}} style={styles.blogListImage}></Image>
                  <Text style={styles.blogName}>{blog.blog_name}</Text>
                  <Text numberOfLines={3} ellipsizeMode={"tail"} style={styles.blogDesc}>{blog.blog_desc}</Text>
                  <View style={styles.bloglistBoxRow}>
                    <View style={styles.blogListDateBox}>
                      <Image source={require("../assets/images/calendar.png")} style={styles.blogListDateBoxImage}></Image>
                      <Text style={styles.blogDate}>{blog.blog_date}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        storage.set("blog_id",blog.blog_id);
                        navigation.navigate("BlogInfoScreen")
                      }}>
                      <LinearGradient colors={['rgb(184,86,196)', 'rgb(121,119,243)']}
                                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                      style={styles.blogButton}>
                        <Text style={{fontWeight: "bold",color:"white"}}>Devamını Oku</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )
            }))
            : (<View></View>)}
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
    fontWeight: 'bold',
    color: "#fff",
  },
  blogList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20
  },
  blogListBox: {
    width: '90%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(19,24,36)",
    marginBottom: 20,
  },
  blogListImage: {
    width: '100%',
    aspectRatio: 1.9,
    resizeMode: "contain",
    marginBottom: 10,
  },
  blogName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#fff",
    marginBottom: 10,
  },
  blogDesc: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 15,
  },
  bloglistBoxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: "flex",
    alignItems: 'center',
    marginBottom: 5,
  },
  blogListDateBox: {
    flexDirection: 'row',
    display: "flex",
    alignItems: 'center',
  },
  blogListDateBoxImage: {
    width: 20,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  blogDate: {
    fontSize: 15,
    fontWeight: '600',
    color: "#fff",
  },
  blogButton: {
    padding: 8,
    borderRadius: 10,
  }
})

export default BlogsScreen;
