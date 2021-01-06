import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./screens/Register";
import Login from "./screens/Login";

// UI Kitten
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { default as theme } from "./assets/custom-theme.json";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Log In" headerMode={false}>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Log In" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
