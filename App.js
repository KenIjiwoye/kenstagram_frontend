import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Register from "./screens/Register";
import Login from "./screens/Login";
// Context
import AuthProvider, { AuthContext } from "./contexts/AuthContext";
// react-query
import { QueryClient, QueryClientProvider } from 'react-query'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

LogBox.ignoreLogs(['Setting a timer']);

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
import Loading from "./components/Loading";

const Stack = createStackNavigator();

const queryClient = new QueryClient()

export default function App() {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <QueryClientProvider client={queryClient} >
        <AuthProvider>
          <AuthContext.Consumer>
            {ctx => {
              console.log('Auth Context =====>>>>', ctx)
              return (
                <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
                  <NavigationContainer>
                    {ctx.loading && (<Loading />)}
                    {!ctx.loading && !ctx.authenticated && (ctx.authToken === null) && (<Stack.Navigator initialRouteName="Login" headerMode={false}>
                    <Stack.Screen name="Register">
                        {props => <Register {...props} registerUser={ctx.registerAuthUser} />}
                      </Stack.Screen>
                      <Stack.Screen name="Login">
                        {props => <Login {...props} loginUser={ctx.loginUser} />}
                      </Stack.Screen>
                    </Stack.Navigator>)}

                    {!ctx.loading && ctx.authenticated && (ctx.authToken !== null) && (<Stack.Navigator initialRouteName="Home" headerMode={false}>
                      <Stack.Screen name="Home">
                        {props => <Home {...props} authContext={ctx} />}
                      </Stack.Screen>
                    </Stack.Navigator>)}
                  </NavigationContainer>
                  <StatusBar style="light" />
                  <Toast />
                </ApplicationProvider>
              )
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      </QueryClientProvider>
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
