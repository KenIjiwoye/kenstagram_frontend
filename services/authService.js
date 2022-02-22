import CONSTANTS from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage'

const authData = async (url,data,action) => {
    const res = await fetch(url, {
        method: action,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: data})
    });
    return res.json();
}

export const signinUser = (username,password) => {
    const user = {username,password}
    return authData(CONSTANTS.SIGNIN_URL,user,'POST')
}

export const signoutUser = async () => {
    const token = await AsyncStorage.getItem('@authToken');
    const opts = {
        method: 'DELETE',
        headers: {
            'Authorization': `${token}`
        }
    }
    const res = await fetch(`${CONSTANTS.SIGNOUT_URL}`, opts)
    return res.json();
}

export const registerUser = (username,email,password) => {
    const user = {username,email,password}
    return authData(CONSTANTS.REGISTER_URL,user,'POST')
}
