import CONSTANTS from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage'
import qs from 'qs'

const postRequest = async (url, data, action) => {
    const token = await AsyncStorage.getItem('@authToken');

    if(!token) return;

    if (data === null) {
        const res = await fetch(url, {
            method: action,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDYwOTUxLCJleHAiOjE2NDc2NTI5NTF9.UrNU8pTPN4hH28jmu_e5J1z3hBTb_1J18YZm9l4YV5M'}`
            }
        });
        return res.json();
    } else {
        const res = await fetch(url, {
            method: action,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDYwOTUxLCJleHAiOjE2NDc2NTI5NTF9.UrNU8pTPN4hH28jmu_e5J1z3hBTb_1J18YZm9l4YV5M'}`
            },
            body: JSON.stringify(data)
        });
        return res.json();
    }

}

export const getPosts = () => {
    return postRequest(CONSTANTS.POSTS_URL, null,'GET')
}

export const getPost = (postId) => {
    const post = postId
    return postRequest(`${CONSTANTS.POSTS_URL/post}`,null,'GET')
}

export const getUserPosts = (currentUserId) => {
    const query = qs.stringify({
        populate: '*',
        populate: 'user_id',
        filters: {
            id: {
                $eq: currentUserId
            }
        }
      }, {
        encodeValuesOnly: true,
      });
    const currentUser = currentUserId
    return postRequest(`${CONSTANTS.POSTS_URL}?${query}`,null,'GET')
}

export const signinUser = (identifier, password) => {
    const user = { identifier, password }
    return postRequest(CONSTANTS.SIGNIN_URL, user, 'POST')
}

export const registerUser = (username, email, password) => {
    const user = { username, email, password }
    return postRequest(CONSTANTS.REGISTER_URL, user, 'POST')
}
