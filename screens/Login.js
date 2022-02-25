import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, Redressed_400Regular } from "@expo-google-fonts/redressed";
import AppLoading from "expo-app-loading";
import { Layout, Input, Button, Divider } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import { signinUser } from '../services/authService'

const Login = ({ navigation, loginUser }) => {
  // react hook forms
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });
  const onSubmit = data => {
    const {username,password} = data;
    console.log(username.toLowerCase())
    console.log(password)

    loginUser(username.toLowerCase(), password)
  }


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

      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='Username'
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='password'
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <Button onPress={handleSubmit(onSubmit)} style={styles.authBtn}>Log In</Button>
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
    // backgroundColor: "#fff",
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
