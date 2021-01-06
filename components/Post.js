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

const Post = ({ userName }) => {
  let [fontsLoaded] = useFonts({
    Redressed_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View style={styles.cardTopLeft}>
              <Avatar source={require("../assets/4.jpeg")} />
              <Text style={styles.username}>{userName}</Text>
            </View>
            <Feather
              style={styles.moreIcon}
              name="more-vertical"
              size={24}
              color="black"
            />
          </View>
          <Image style={styles.image} source={require("../assets/3.jpeg")} />
          <View style={styles.iconRow}>
            <EvilIcons
              style={styles.iconRowItems}
              name="heart"
              size={40}
              color="white"
            />
            <Ionicons
              style={styles.iconRowItems}
              name="chatbubble-outline"
              size={30}
              color="white"
            />
            <Feather
              style={styles.iconRowItems}
              name="send"
              size={30}
              color="white"
            />
          </View>
          <Text style={styles.likesText}>67 likes</Text>
          <Text style={{ marginLeft: 16, marginRight: 16 }}>
            <Text style={styles.username}>username </Text>
            <Text style={styles.descriptionText}>
              This is my instagram clone app by Ken This is my instagram clone
              app by Ken This is my instagram clone app by Ken
            </Text>
          </Text>
          {/* COMMENTS */}
          <Text style={{ color: "grey", marginLeft: 16, fontWeight: "bold" }}>
            comments
          </Text>
          <Text style={{ marginLeft: 16, marginRight: 16 }}>
            <Text style={styles.username}>username2 </Text>
            <Text style={styles.descriptionText}>
              This is my instagram clone app by Ken
            </Text>
          </Text>
          <View
            style={{
              ...styles.cardTopLeft,
              marginTop: 16,
              marginLeft: 16,
              marginBottom: 24,
            }}
          >
            <Avatar source={require("../assets/4.jpeg")} />
            <Input placeholder="Add a comment.." style={{ marginLeft: 8 }} />
            {/* <Text style={{ ...styles.username, opacity: 0.7 }}>
            Add a comment
          </Text> */}
          </View>
          {/* <Divider style={{ backgroundColor: "#3e3e3e", marginTop: 8 }} /> */}
        </View>
      </KeyboardAvoidingView>
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
    paddingLeft: 16,
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

export default Post;
