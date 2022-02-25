import React from "react";
import { View, StyleSheet, SafeAreaView, Image, Dimensions, Platform } from "react-native";
import { Layout, Button, Input, Text } from "@ui-kitten/components";
import NewPostImg from '../assets/new_post.svg'
import postImg from '../assets/new-post.png'
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from "react-hook-form";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createPost } from "../services/postService";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const AddPost = () => {
  const [image, setImage] = React.useState(null)
   // react hook forms
   const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      image: null,
      caption: ''
    }
  });




  const onSubmit = async data => {
    const {caption} = data;
    console.log(caption)
    console.log(image)

    createPost(image, caption)
  }

  const pickImage = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };
  
  const openCamera = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };


  return (
    <Layout style={styles.container}>
      <SafeAreaView>
        {image && <Image style={styles.image} source={{ uri: image.uri}} resizeMode='contain' />}
        {image === null && <Image style={styles.image} source={require('../assets/new-post.png')} resizeMode='contain' />}
        <View style={styles.imagePicker} >
        <Button onPress={pickImage} >Select Image</Button>
        <Text  >-or-</Text>
        <Button onPress={openCamera} >Open Camera</Button>
        </View>
        <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={styles.caption}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='Caption...'
            multiline={true}
            textStyle={{ minHeight: 64 }}
          />
        )}
        name="caption"
      />
      {errors.caption && <Text>This is required.</Text>}
        <Button style={styles.createBtn} onPress={handleSubmit(onSubmit)}  >Share what's new!</Button>
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
  },
  createBtn: {
    marginVertical: 24
  },
  caption: {
    marginTop: 16
  },
  imagePicker: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default AddPost;
