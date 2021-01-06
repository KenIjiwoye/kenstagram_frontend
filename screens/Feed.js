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

const data = [
  { id: 1, userName: "ken" },
  { id: 2, userName: "kenneth" },
  { id: 3, userName: "kenny" },
];

const Feed = () => {
  let [fontsLoaded] = useFonts({
    Redressed_400Regular,
  });
  const renderItem = ({ item }) => <Post userName={item.userName} />;

  if (!fontsLoaded) {
    return <AppLoading />;
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
        keyExtractor={(item) => item.userName}
      />
      <Post />
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
