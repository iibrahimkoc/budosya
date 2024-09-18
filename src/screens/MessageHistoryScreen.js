import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const MessageHistoryScreen = ({navigation}) => {
  return (
    <View style={styles.container}>

      <Text>Message History Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default MessageHistoryScreen
