import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import {
  Icon,
  // Text,
  TopNavigation,
  TopNavigationAction,
  Layout,
  Card,
  Avatar,
  Divider,
  Input,
} from "@ui-kitten/components";
import AppLoading from "expo-app-loading";
import { useFonts, Redressed_400Regular } from "@expo-google-fonts/redressed";
import { Feather, EvilIcons, Ionicons } from "@expo/vector-icons";
import Post from "../components/Post";
import { useQuery } from "react-query";
import { PostContext } from "../contexts/PostContext";
import Loading from "../components/Loading";

// const data = [
//   {
//     id: 1,
//     userName: "ken",
//     profilePic:
//       "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-m4-coupe-111-1600787953.jpg?crop=0.747xw:0.630xh;0.111xw,0.370xh&resize=1200:*",
//     caption:
//       "This iiiis my instagram clone app by Ken This is my instagram clone app by Ken This is my instagram clone app by Ken",
//     likes: 88,
//     mainImg:
//       "https://cdn.bmwblog.com/wp-content/uploads/2020/11/2021-bmw-m4-toronto-red-08-1536x1024.jpg",
//   },
//   {
//     id: 2,
//     userName: "harry",
//     profilePic:
//       "https://cdn.slashgear.com/wp-content/uploads/2019/07/P6286325-1280x720.jpg",
//     caption:
//       "This iiiis my instagram clone app by Ken This is my instagram clone app by Ken This is my instagram clone app by Ken",
//     likes: 88,
//     mainImg:
//       "https://cdn.slashgear.com/wp-content/uploads/2019/07/P6286325-1280x720.jpg",
//   },
//   {
//     id: 3,
//     userName: "tom",
//     profilePic:
//       "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-m4-coupe-111-1600787953.jpg?crop=0.747xw:0.630xh;0.111xw,0.370xh&resize=1200:*",
//     caption:
//       "This iiiis my instagram clone app by Ken This is my instagram clone app by Ken This is my instagram clone app by Ken",
//     likes: 88,
//     mainImg:
//       "https://cdn.motor1.com/images/mgl/KpGLN/s1/2021-bentley-bentayga.webp",
//   },
// ];

const Feed = () => {
  let [fontsLoaded] = useFonts({
    Redressed_400Regular,
  });

  const { data, isLoading, isError, error } = React.useContext(PostContext);

  console.log('testing the posts query ===>>>', data)

  const renderItem = ({ item }) => (
    <Post
      userName={item.user.username}
      profilePic={item.profilePic}
      caption={item.caption}
      likes={item.likes}
      mainImg={item.image}
    />
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  if(isLoading) {
    return <Loading />
  }

  if(isError) {
    console.log('this is the error', error)
    return <Text>Error loading posts</Text>
  }

  return (
    <Layout style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.logoText}>Kenstagram</Text>
        <Feather name="send" size={24} color="white" />
      </SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* <Post /> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: StatusBar.currentHeight || 0,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#3e3e3e",
  },
  logoText: {
    fontFamily: "Redressed_400Regular",
    fontSize: 30,
    color: "white",
  },
  card: {
    // backgroundColor: "white",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  cardTopLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 16,
  },
  moreIcon: {
    color: "white",
  },
  image: {
    height: 332,
    alignSelf: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    marginTop: 8,
  },
  iconRowItems: {
    marginRight: 8,
  },
  likesText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  description: {
    flexDirection: "row",
  },
  descriptionText: {
    color: "white",
    marginLeft: 8,
    flexWrap: "wrap",
    // width: 50,
  },
});

export default Feed;
