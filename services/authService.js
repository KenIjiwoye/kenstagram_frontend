import CONSTANTS from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage'

const authRequest = async (url,payload,action) => {
    const res = await fetch(url, {
        method: action,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: payload})
    });
    return res.json();
}

export const signinUser = async (username,password) => {
    const user = {username,password}
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: user})
    }
    let res = await fetch(`${CONSTANTS.SIGNIN_URL}`, opts)
    return res.json();
    // return authRequest(CONSTANTS.SIGNIN_URL,user,'POST')
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
    return authRequest(CONSTANTS.REGISTER_URL,user,'POST')
}
