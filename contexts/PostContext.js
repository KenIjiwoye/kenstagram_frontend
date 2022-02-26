import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { createPost, getPosts, createPostImage } from '../services/postService';
import { useQuery } from 'react-query';

export const PostContext = React.createContext();

export default function PostProvider({ children }) {
    // const [posts,setPosts] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(0);

    // const { isLoading, isError, data, error } = useQuery('posts', getPosts)
    // const { isLoading, isError, data, error } = useQuery('posts', () => getPosts());


    const getAllPosts = async () => {
        try {
            const allPosts = await getPosts();
            // setPosts(allPosts);
            // setLoading(false);
        } catch (err) {
            console.warn('all post loading error', err);
            Toast.show({
                type: 'error',
                text1: 'A problem with loading posts!',
                text2: `${err}`
            });
        }

    }

    const addNewPost = async (image, caption) => {
        setLoading(true)

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

        console.log('Form data', { user: fData })


        try {
            await createPostImage(fData)
                .then(res => {
                    console.log('create post response in context ==<><>', res)
                    Toast.show({
                        type: 'success',
                        text1: 'New Post up was successful!!'
                    });
                    setLoading(false)
                    setRefresh(1)
                })
                .catch(err => {
                    Toast.show({
                        type: 'error',
                        text1: 'A problem with creating this post!',
                        text2: `${err}`
                    });
                })

        } catch (err) {
            console.warn('Post creation error', err);
            Toast.show({
                type: 'error',
                text1: 'A problem with creating this post!',
                text2: `${err}`
            });
            setLoading(false)
        }
    }

    React.useEffect(() => {
        if (refresh === 0) return;
        setRefresh(0);
    },[refresh])
    return (
        <PostContext.Provider value={{
            getAllPosts,
            addNewPost,
            loading
        }} >
            {children}
        </PostContext.Provider>
    );
}