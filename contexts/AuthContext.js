import React from 'react'
import {signinUser,registerUser} from '../services/authService'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

export default function AuthProvider({children}){
    const [authenticated, setAuthenticated] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [authToken, setAuthToken] = React.useState(null);

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@authToken')
          if (value !== null) {
            // value previously stored
            console.log('storage value', value);
            setAuthToken(value);
            setAuthenticated(true);
          }
        } catch (e) {
          // error reading value
          setAuthToken(null);
            setAuthenticated(false);
        }
      }

      const loginUser = async (identifier, password) => {
        signinUser(identifier,password)
        .then(async u => {
            setLoading(false)
            setAuthToken(u.jwt);
            setAuthenticated(true);
            const token = JSON.stringify(u.jwt)
            try {
                await AsyncStorage.setItem('@authToken', token)
            } catch (err) {
                console.warn('asyncstorage error',err)
            }
        })
        .catch(err => {
            setLoading(false)
            console.warn(err)
        })
      }

      const logoutUser = async () => {
        try {
          await AsyncStorage.removeItem('@authToken');
          setAuthenticated(false);
          setAuthToken(null);
        } catch (err) {
          console.warn(err);
        }
      }

      React.useEffect(() => {
        // const value = AsyncStorage.getItem('@authToken')
        // console.log('effect storage value', value)
        getData()
      }, [authToken])
    
      console.log('looking at the app.js', authToken)

    return(
        <AuthContext.Provider value ={{
            authToken,
            authenticated,
            loading,
            setAuthToken,
            setAuthenticated,
            setLoading,
            loginUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}