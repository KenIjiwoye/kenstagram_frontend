import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Register from "./screens/Register";
import Login from "./screens/Login";
// Context
import AuthProvider, { AuthContext } from "./contexts/AuthContext";

// UI Kitten
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import { default as theme } from "./assets/custom-theme.json";
import Home from "./screens/Home";

const Stack = createStackNavigator();

export default function App() {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <AuthProvider>
      <AuthContext.Consumer>
        {ctx => {
          console.log('ctx new', ctx)
          return (
            <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
              <NavigationContainer>
                {!ctx.loading && !ctx.authenticated && (<Stack.Navigator initialRouteName="Login" headerMode={false}>
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>)}

                {!ctx.loading && ctx.authenticated && (<Stack.Navigator initialRouteName="Home" headerMode={false}>
                  <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>)}
              </NavigationContainer>
              <StatusBar style="light" />
            </ApplicationProvider>
          )
        }}
      </AuthContext.Consumer>
      </AuthProvider>
    </>
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
