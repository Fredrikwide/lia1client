import axios from 'axios'
const base_url = 'https://booking-app-lia1.herokuapp.com/'
const admin_url = `${base_url}admin/`

export const checkToken = async (token) => {

  const tokenRes = await axios.post(`${admin_url}/validToken`, null,
    { headers: { "x-auth-token": token } }
  )

  return tokenRes.data

}
