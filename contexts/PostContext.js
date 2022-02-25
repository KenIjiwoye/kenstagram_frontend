import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { getPosts } from '../services/postService';
import { useQuery } from 'react-query';

export const PostContext = React.createContext();

export default function PostProvider({children}) {
    const [posts,setPosts] = React.useState(null);

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

    // React.useEffect(() => {
    //     getAllPosts();
    // },[])
    return(
        <PostContext.Provider value={{
            getAllPosts
        }} >
            {children}
        </PostContext.Provider>
    );
}