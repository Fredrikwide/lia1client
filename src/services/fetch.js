import Axios from 'axios'

// export const get = async () => {
//     const getRes = await Axios.get(`${baseApiURI}+${endpoint}`, { headers: { 'x-auth-token': userData.token } })
//     return getRes
// }

// export const post = async () => {
//     const postRes = await Axios.post(`${baseApiURI}+${endpoint}`, { headers: { 'x-auth-token': userData.token } })
//     return postRes
// }

// export const adminGet = async () => {
//     const getAdminRes = await Axios.get(`${baseApiURI}+${endpoint}`, { headers: { 'x-auth-token': userData.token } })
//     return getAdminRes
// }

export const getUserFromToken = async (token) => {
    const UserRes = await Axios.get('http://localhost:5000/admin/', { headers: { 'x-auth-token': token } })
    console.log("user resp is", UserRes.data)
    return UserRes
}