import { useState } from "react"
import Cookies from 'js-cookie'

const useToken = (tokenName) => {

    const getToken = (tokenName) => {
        const token = Cookies.get(`${tokenName}`)
        return token
    }

    const [token, setToken] = useState(getToken(tokenName))

    const saveToken = (tokenName, token) => {
        Cookies.set(`${tokenName}`, token)
        setToken(token)
    }

    return {token, setToken: saveToken}
}

export default useToken