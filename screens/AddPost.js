import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions } from "react-native";
import { Layout, Button } from "@ui-kitten/components";
import NewPostImg from '../assets/new_post.svg'
import postImg from '../assets/new-post.png'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const AddPost = () => {
  return (
    <Layout style={styles.container}>
      <SafeAreaView>
        <Image style={styles.image} source={require('../assets/new-post.png')} resizeMode='contain' />
        <Button>Share what's new!</Button>
        {/* <Text>Add Post</Text> */}
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center'
  }
});

export default AddPost;
