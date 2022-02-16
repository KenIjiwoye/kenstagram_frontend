import React from 'react'
import { signinUser, registerUser } from '../services/authService'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [authToken, setAuthToken] = React.useState(null);

  // const getData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('@authToken')
  //       if (value !== null) {
  //         // value previously stored
  //         console.log('storage value', value);
  //         setAuthToken(value);
  //         setAuthenticated(true);
  //       }
  //     } catch (e) {
  //       // error reading value
  //       setAuthToken(null);
  //         setAuthenticated(false);
  //     }
  //   }

  const loginUser = async (identifier, password) => {
    signinUser(identifier, password)
      .then(async u => {
        // setLoading(false)
        setAuthToken(u.jwt);
        setAuthenticated(true);
        const token = JSON.stringify(u.jwt)
        try {
          await AsyncStorage.setItem('@authToken', token)
        } catch (err) {
          console.warn('asyncstorage error', err)
          setAuthToken(null);
          setAuthenticated(false);
        }
      })
      .catch(err => {
        setLoading(false)
        setAuthenticated(false)
        setAuthToken(null)
        console.warn(err)
      })
  }

  const logoutUser = async () => {
    try {
      await AsyncStorage.clear();
      setAuthenticated(false);
      setAuthToken(null);
    } catch (err) {
      console.warn(err);

    }
  }

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken')
      if (authToken === token) {
        setAuthenticated(true)
        setAuthToken(token)
      } else {
        setAuthenticated(false)
        setAuthToken(null)
      }

    }

  }, [])

  // console.log('Auth context authToken', authToken)
  // console.log('Auth context authenticated', authenticated)

  return (
    <AuthContext.Provider value={{
      authToken,
      authenticated,
      loading,
      setAuthToken,
      setAuthenticated,
      setLoading,
      loginUser,
      logoutUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}