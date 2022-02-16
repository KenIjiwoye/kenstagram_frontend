import React from 'react'

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
            console.log('storage value', value)
            setAuthToken(value)
          }
        } catch (e) {
          // error reading value
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
            setLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}