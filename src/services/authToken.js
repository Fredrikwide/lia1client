import axios from 'axios'


export const checkToken = async (token) => {

  const tokenRes = await axios.post('http://localhost:5000/admin/validToken', null,
    { headers: { "x-auth-token": token } }
  )

  return tokenRes.data

}
