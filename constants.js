export const baseUrl = 'http://192.168.43.47:3000';
// export const baseUrl = 'https://0f56-41-191-107-129.ngrok.io';

const CONSTANTS = {
    REGISTER_URL: `${baseUrl}/users`,
    SIGNIN_URL: `${baseUrl}/users/sign_in`,
    SIGNOUT_URL: `${baseUrl}/users/sign_out`,
    POSTS_URL: `${baseUrl}/api/v1/posts`,
    USER_POSTS_URL: `${baseUrl}/api/v1/my_posts`,
}

export default CONSTANTS