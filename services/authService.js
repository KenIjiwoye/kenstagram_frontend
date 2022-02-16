import CONSTANTS from "../constants";

const authData = async (url,data,action) => {
    const res = await fetch(url, {
        method: action,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export const signinUser = (identifier,password) => {
    const user = {identifier,password}
    return authData(CONSTANTS.SIGNIN_URL,user,'POST')
}

export const registerUser = (username,email,password) => {
    const user = {username,email,password}
    return authData(CONSTANTS.REGISTER_URL,user,'POST')
}

// export const loginUser = (identifier,password) => (
//     new Promise((resolve,reject) => {
//         const user = {
//             identifier,
//             password
//         }
//         try {
//             fetch(CONSTANTS.SIGNIN_URL, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(user)
//             })
//             .then(res => {
//                 resolve(res.json())
                
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// )