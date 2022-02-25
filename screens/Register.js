import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, Redressed_400Regular } from "@expo-google-fonts/redressed";
import AppLoading from "expo-app-loading";
import { Layout, Input, Button, Divider } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import Toast from 'react-native-toast-message';

const Register = ({ navigation, registerUser }) => {
  // react hook forms
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
  });
  const onSubmit = async data => {
    const { username, email, password } = data;
    console.log(username.toLowerCase())
    console.log(email.toLowerCase())
    console.log(password)

     await registerUser(username.toLowerCase(), email.toLowerCase(), password)
      //       .then(() => (
      //         Toast.show({
      //           type: 'success',
      //           text1: 'Sign up was successful!!',
      //           text2: 'Please log into your account'
      //         })
      //       ))
      //       .catch((err) => (Toast.show({
      //         type: 'error',
      //         text1: 'A problem with your sign up!',
      //         text2: 'Please check the values and try again'
      //       })
      //       // navigation.navigate('Register')))
      //       // reset({username,email,password})
      // ))
    
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
      <Text style={styles.subText}>Register</Text>
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
            placeholder='Email'
            keyboardType='email-address'
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}

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
      <Button onPress={handleSubmit(onSubmit)} style={styles.authBtn}>Register</Button>
      <Text
        onPress={() => navigation.navigate("Login")}
        style={styles.authLinks}
        style={styles.authLinks}
      >
        Already have an account? Login here
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

export default Register;
