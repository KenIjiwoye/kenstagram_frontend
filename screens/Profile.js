import React from "react";
import { Layout, Button, Divider, Avatar, List } from "@ui-kitten/components";
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, FlatList } from "react-native";
import {getUserPosts} from '../services/postService'
import {useQuery} from 'react-query'
import Loading from "../components/Loading";
import CONSTANTS, {baseUrl} from "../constants";

const Profile = ({navigation, authCtx}) => {
  const userId = 1;
  const { isLoading, isError, data, error } = useQuery(['posts', userId], () => getUserPosts(userId))

  // React.useEffect(() => {
  //   getUserPosts(1)
  //     .then(res => console.log('this is my posts', res))
  // },[])

  const signOut = async () => {
    console.log('logging out')
    await authCtx.logoutUser()
  }

  const mData = [
    {
      id: 1,
      userName: "ken",
      profilePic:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-m4-coupe-111-1600787953.jpg?crop=0.747xw:0.630xh;0.111xw,0.370xh&resize=1200:*",
      caption:
        "This iiiis my instagram clone app by Ken This is my instagram clone app by Ken This is my instagram clone app by Ken",
      likes: 88,
      mainImg:
        "https://cdn.bmwblog.com/wp-content/uploads/2020/11/2021-bmw-m4-toronto-red-08-1536x1024.jpg",
    },
    {
      id: 2,
      userName: "harry",
      profilePic:
        "https://cdn.slashgear.com/wp-content/uploads/2019/07/P6286325-1280x720.jpg",
      caption:
        "This iiiis my instagram clone app by Ken This is my instagram clone app by Ken This is my instagram clone app by Ken",
      likes: 88,
      mainImg:
        "https://cdn.slashgear.com/wp-content/uploads/2019/07/P6286325-1280x720.jpg",
    },
    {
      id: 3,
      userName: "tom",
      profilePic:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-m4-coupe-111-1600787953.jpg?crop=0.747xw:0.630xh;0.111xw,0.370xh&resize=1200:*",
      caption:
        "This iiiis my instagram clone app by Ken This is my instagram clone app by Ken This is my instagram clone app by Ken",
      likes: 88,
      mainImg:
        "https://cdn.motor1.com/images/mgl/KpGLN/s1/2021-bentley-bentayga.webp",
    },
    {
      id: 4,
      userName: "ken",
      profilePic:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-m4-coupe-111-1600787953.jpg?crop=0.747xw:0.630xh;0.111xw,0.370xh&resize=1200:*",
      caption:
        "This iiiis my instagram clone app by Ken This is my instagram clone app by Ken This is my instagram clone app by Ken",
      likes: 88,
      mainImg:
        "https://cdn.bmwblog.com/wp-content/uploads/2020/11/2021-bmw-m4-toronto-red-08-1536x1024.jpg",
    },
    {
      id: 5,
      userName: "harry",
      profilePic:
        "https://cdn.slashgear.com/wp-content/uploads/2019/07/P6286325-1280x720.jpg",
      caption:
        "This iiiis my instagram clone app by Ken This is my instagram clone app by Ken This is my instagram clone app by Ken",
      likes: 88,
      mainImg:
        "https://cdn.slashgear.com/wp-content/uploads/2019/07/P6286325-1280x720.jpg",
    },
    {
      id: 6,
      userName: "tom",
      profilePic:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-m4-coupe-111-1600787953.jpg?crop=0.747xw:0.630xh;0.111xw,0.370xh&resize=1200:*",
      caption:
        "This iiiis my instagram clone app by Ken This is my instagram clone app by Ken This is my instagram clone app by Ken",
      likes: 88,
      mainImg:
        "https://cdn.motor1.com/images/mgl/KpGLN/s1/2021-bentley-bentayga.webp",
    },
    
  ];


  const renderItem = ({ item }) => {
    console.warn('LOGGING THE renderItem ==>>', item.attributes.image.data.attributes.formats.medium)
    return(
      <Image source={{ uri: `${baseUrl}${item.attributes.image.data.attributes.formats.medium.url}`}} style={styles.thumbnail} />
    )
  };
  // const renderItem = ({ item, index }) => (
  //   <Image source={{ uri: `${item.mainImg}`}} style={styles.thumbnail} />
  // );

  if (isLoading){
   return <Loading />
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>
  }

  console.warn('the data from react query', data.data)

  return (
    <Layout style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}
      >
        <Text style={styles.username}>username</Text>
        {/* TOP ROW */}
        <View style={styles.avatarRow}>
          <Avatar
            source={{
              uri:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-m4-coupe-111-1600787953.jpg?crop=0.747xw:0.630xh;0.111xw,0.370xh&resize=1200:*",
            }}
            size="giant"
            style={{ width: 80, height: 80 }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              38
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>Posts</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              500
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>Followers</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              50
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>Following</Text>
          </View>
        </View>
        {/* PROFILE DESCRIPTION */}
        <View style={styles.description}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            AdeTokunbo Ijiwoye
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            My Profile description | and other info
          </Text>
        </View>
        {/* EDIT PROFILE BUTTON IF CURRENT USER  */}
        <Button style={{ marginTop: 16, height: 40 }} appearance="outline">
          Edit Profile
        </Button>
        <Button onPress={signOut}  style={{ marginTop: 16, height: 40 }} appearance="outline">
          Temporary Logout
        </Button>
        <Divider style={{ marginTop: 8 }} />
        <FlatList
        data={data.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // horizontal
        numColumns={3}
         />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  username: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  avatarRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  description: {
    marginTop: 16,
  },
  thumbnail: {
    width: 130,
    height: 130,
    marginHorizontal: 2
  }
});

export default Profile;
