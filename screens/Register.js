import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, Redressed_400Regular } from "@expo-google-fonts/redressed";

const Register = () => {
  let [fontsLoaded] = useFonts({
    Redressed_400Regular,
  });
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Kenstagram</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontFamily: "Redressed_400Regular",
    fontSize: 32,
  },
});

export default Register;
