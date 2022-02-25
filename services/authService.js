import CONSTANTS from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage'

const authRequest = async (url,payload,action) => {
    const res = await fetch(url, {
        method: action,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify({user: payload})
    });
    return res.json();
}

export const signinUser = async (username,password) => {
    let user = {username,password}
    return authRequest(CONSTANTS.SIGNIN_URL,user,'POST')
}

export const registerUser = (username,email,password) => {
    const user = {username,email,password}
    return authRequest(CONSTANTS.REGISTER_URL,user,'POST')
}

export const signoutUser = async () => {
    const token = await AsyncStorage.getItem('@authToken');
    const pToken = JSON.parse(token)
    const opts = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pToken}`,
            'Accept': '*/*',

        }
    }
    const res = await fetch(`${CONSTANTS.SIGNOUT_URL}`, opts)
    return res.json();
}

