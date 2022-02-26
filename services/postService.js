import CONSTANTS from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage'
import qs from 'qs'
import { Toast } from "react-native-toast-message/lib/src/Toast";

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

export const getUserPosts = () => {
  return postRequest(CONSTANTS.USER_POSTS_URL, null, 'GET')
}

// export const getUserPosts = (currentUserId) => {
//     // posts?populate=*&filters[user_id][id][$eq]=1
//     const query = qs.stringify({
//         populate: '*',
//         filters: {
//             user_id: {
//                 id: {
//                     $eq: currentUserId
//                 }
//             }
//         }
//       }, {
//         encodeValuesOnly: true,
//       });
//     const currentUser = currentUserId
//     return postRequest(`${CONSTANTS.POSTS_URL}?${query}`,null,'GET')
// }

// TODO: move most of this logic to the Post Context, once it is created
export const createPost = async (image,caption) => {
    // formData info
    const fData = new FormData();
    fData.append('image', {
      name: image.uri.split('/').pop(),
      type: 'image/jpeg',
      uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
    });

    fData.append('caption', caption)
    // fData.append('user_id', 1)
    // Object.keys(body).forEach((key) => {
    //   data.append(key, body[key]);
    // });

    console.log('Form data', {user: fData})

    
    const token = await AsyncStorage.getItem('@authToken')

    fetch('http://192.168.43.47:3000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*'
      },
      body: fData
    })
    .then(res => res.json())
    .then(res => {
      if (res.error !== null) {
        console.warn('upload failed!! ===>>>', res);
      Toast.show({
        type: 'error',
        text1: `${res.exception}`
      });
      } else {
        console.log('upload success ===>>>', res);
        Toast.show({
          type: 'success',
          text1: 'New Post up was successful!!'
        });
      }
     
    })
    .catch(err => {
      console.warn('Post error', err);
      Toast.show({
        type: 'error',
        text1: `${err}`
      });
    })
}

export const createPostImage = async (data) => {
  const token = await AsyncStorage.getItem('@authToken')

  fetch(`${CONSTANTS.POSTS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
      'Accept': '*/*'
    },
    body: data
  })
  .then(res => res.json())
  // .then(res => {
  //   if (res.error === null) {
  //       console.log('upload success ===>>>', res);
  //     Toast.show({
  //       type: 'success',
  //       text1: 'New Post up was successful!!'
  //     });
  //   }
   
  // })
  .catch(err => {
    console.warn('Post error', err);
    Toast.show({
      type: 'error',
      text1: `${err}`
    });
  })
}