import React from 'react'
import { signinUser, registerUser, signoutUser } from '../services/authService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [authToken, setAuthToken] = React.useState(null);
  const [user, setUser] = React.useState(null);



  const registerAuthUser = async (username, email, password) => {
    registerUser(username, email, password)
      .then(async u => {
        console.log('AUTH_CTX_REGISTER register ===>>>', u)
        setLoading(true)
        try {
          setAuthToken(u.jwt);
          setAuthenticated(true);
          setUser(u.user);
          setLoading(false)
          const token = JSON.stringify(u.jwt)
          await AsyncStorage.setItem('@authToken', token)
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Sign up was successful!!',
            text2: `Welcome aboard, ${u.user.username}!`
          });
        } catch (err) {
          console.warn('asyncstorage error', err)
          setAuthToken(null);
          setAuthenticated(false);
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'A problem with your sign up!',
            text2: `${err}`
          });
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'A problem with your sign up!',
          text2: 'Please check the values and try again'
        });
        setLoading(false)
        setAuthenticated(false)
        setAuthToken(null)
        console.warn(err)
      })
  }
// @TODO find out why the user obj is missing on login
  const loginUser = async (username, password) => {
    await signinUser(username, password)
      .then(async u => {
        console.log('AUTH_CTX_LOGIN ===>>>', u)
        setLoading(true)
        setAuthToken(u.jwt);
        setAuthenticated(true);
        setUser(u.user);
        try {
          const token = JSON.stringify(u.jwt)
          await AsyncStorage.setItem('@authToken', token)
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Sign In was successful!!',
            text2: `Welcome back, ${u.username}`
          });
        } catch (err) {
          console.warn('asyncstorage error', err)
          setAuthToken(null);
          setAuthenticated(false);
          setLoading(false);
        }
        
      })
      .catch(err => {
        setLoading(false)
        // setAuthenticated(false)
        // setAuthToken(null)
        console.warn('sign in user error in auth context ===>>>',err)
        Toast.show({
          type: 'error',
          text1: 'A problem with signing you in!',
          text2: 'Please check the values and try again'
        });
      })
  }

  const logoutUser = async () => {
    setLoading(true);
    try {
      await signoutUser(authToken)
      await AsyncStorage.removeItem('@authToken');
      setAuthenticated(false);
      setAuthToken(null);
      setLoading(false);
      setUser(null)
      Toast.show({
        type: 'success',
        text1: 'See you again soon!!',
      });
    } catch (err) {
      console.warn(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'A problem with signing you out!',
        text2: 'Please try again'
      });

    }
  }

  const load = async () => {
    try {
      let token = await AsyncStorage.getItem('@authToken')
      const auth_token = authToken

      if (token !== null) {
        setAuthToken(token);
        setAuthenticated(true);
        setLoading(false)
      }
    } catch (err) {
      console.warn(err);
      setAuthenticated(false);
        setLoading(false)
    }
  }

  React.useEffect(() => {
    load();

  }, [])

  // console.log('Auth context authToken', authToken)
  // console.log('Auth context authenticated', authenticated)

  return (
    <AuthContext.Provider value={{
      authToken,
      authenticated,
      loading,
      user,
      setAuthToken,
      setAuthenticated,
      setLoading,
      loginUser,
      logoutUser,
      setUser,
      registerAuthUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}