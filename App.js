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
// react-query
import { QueryClient, QueryClientProvider } from 'react-query'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [authToken, setAuthToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken')
      if (!token) {
        setAuthToken(null)
        setAuthenticated(false)
        setUser(null)
      }
      if (authToken === token) {
        setAuthenticated(true)
        setAuthToken(token)
      } 

    }

  }, [])

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
                      <Stack.Screen name="Register" component={Register} />
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
