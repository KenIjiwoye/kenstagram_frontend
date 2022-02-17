export const baseUrl = 'http://192.168.43.47:1337';
// export const baseUrl = 'https://fd82-41-191-104-252.ngrok.io';

const CONSTANTS = {
    REGISTER_URL: `${baseUrl}/api/auth/local/register`,
    SIGNIN_URL: `${baseUrl}/api/auth/local`,
    POSTS_URL: `${baseUrl}/api/posts`
}

export default CONSTANTS