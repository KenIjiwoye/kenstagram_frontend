import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, Redressed_400Regular } from "@expo-google-fonts/redressed";
import AppLoading from "expo-app-loading";
import { Layout, Input, Button, Divider } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  let [fontsLoaded] = useFonts({
    Redressed_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Layout style={styles.container}>
      <Text style={styles.logoText}>Kenstagram</Text>
      <Text style={styles.subText}>Login</Text>
      <Divider />
      <Input
        style={styles.input}
        placeholder="Email address"
        keyboardType="email-address"
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <Input
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={(val) => setUsername(val)}
      />
      <Button style={styles.authBtn}>Register</Button>
      <Text
        onPress={() => navigation.navigate("Register")}
        style={styles.authLinks}
      >
        Don't have an account? Sign Up Here
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 48,
    paddingRight: 48,
  },
  logoText: {
    fontFamily: "Redressed_400Regular",
    fontSize: 48,
    color: "white",
  },
  input: {
    backgroundColor: "#fff",
    // marginRight: 48,
    // marginLeft: 48,
  },
  subText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  authBtn: {
    width: "100%",
  },
  authLinks: {
    color: "#fff",
    marginTop: 16,
  },
});

export default Login;
