import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = "http://localhost:5000"

const customAxios = axios.create({
    baseURL: BASE_URL
})

customAxios.interceptors.response.use((response) => {
    return response
}, async (err) => {
    const prevRequest = err?.config

    if(err.response.status === 403 && !prevRequest?.sent){
        prevRequest.sent = true
        
        const requestResponse = await axios({
            method: "GET",
            url: `${BASE_URL}/refreshToken`,
            headers: {
                "Content-type": "application/json",
                "RefreshToken": `Bearer ${Cookies.get("refreshToken")}`
            }
        })

        console.log("Auth token requested")
        console.log(requestResponse)

        const newAuthToken = requestResponse.data.authToken
        Cookies.set("authToken", newAuthToken)
        prevRequest.headers["Authorization"] = `Bearer ${newAuthToken}`
        return customAxios(prevRequest)
    }

    return Promise.reject(err)
})

export default customAxios