import axios from 'axios'


export const checkToken = async (token) => {

  const tokenRes = await axios.post('http://localhost:5000/admin/validToken', null,
    { headers: { "x-auth-token": token } }
  )
  console.log("token valid resp", tokenRes.data)
  return tokenRes.data

}
