import React from 'react'
import { signinUser, registerUser } from '../services/authService'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [authToken, setAuthToken] = React.useState(null);
  const [user, setUser] = React.useState(null);



  const loginUser = async (username, password) => {
    signinUser(username, password)
      .then(async u => {
        console.log('AUTH_CTX_FN ===>>>', u)
        setLoading(true)
        setAuthToken(u.auth_token);
        setAuthenticated(true);
        setUser(u.user);
        try {
          const token = JSON.stringify(u.auth_token)
          await AsyncStorage.setItem('@authToken', token)
          setLoading(false);
        } catch (err) {
          console.warn('asyncstorage error', err)
          setAuthToken(null);
          setAuthenticated(false);
          setLoading(false);
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
    setLoading(true);
    try {
      await AsyncStorage.clear();
      setAuthenticated(false);
      setAuthToken(null);
      setLoading(false);
    } catch (err) {
      console.warn(err);
      setLoading(false);

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