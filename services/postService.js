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
                'Authorization': `Bearer ${token}`
            }
        });
        return res.json();
    } else {
        const res = await fetch(url, {
            method: action,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
    // posts?populate=*&filters[user_id][id][$eq]=1
    const query = qs.stringify({
        populate: '*',
        filters: {
            user_id: {
                id: {
                    $eq: currentUserId
                }
            }
        }
      }, {
        encodeValuesOnly: true,
      });
    const currentUser = currentUserId
    return postRequest(`${CONSTANTS.POSTS_URL}?${query}`,null,'GET')
}

// export const signinUser = (identifier, password) => {
//     const user = { identifier, password }
//     return postRequest(CONSTANTS.SIGNIN_URL, user, 'POST')
// }

// export const registerUser = (username, email, password) => {
//     const user = { username, email, password }
//     return postRequest(CONSTANTS.REGISTER_URL, user, 'POST')
// }
