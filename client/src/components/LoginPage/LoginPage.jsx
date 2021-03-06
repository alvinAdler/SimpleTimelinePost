import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'
import Cookies from 'js-cookie'
import customAxios from '../utilities/customAxios'

import'./LoginPage_master.css'

import AuthContext from '../utilityComponents/contexts/AuthContext'
import BaseButton from '../utilityComponents/Buttons/BaseButton/BaseButton'

const LoginPage = () => {

    const [userLoginData, setUserLoginData] = useState({
        username: "",
        password: ""
    })

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLoginSubmit = (ev) => {
        ev.preventDefault()

        if(Object.values(userLoginData).includes("")){

            swal.fire({
                icon: "error",
                title: "A field is empty",
                text: "Please fill out all input fields",
                showCancelButton: true,
                customClass: {
                    popup: "swal-custom-popup",
                    icon: "swal-icon",
                    confirmButton: "swal-custom-confirm",
                    cancelButton: "swal-custom-cancel"
                }
            })

            return
        }

        customAxios({
            method: "POST",
            url: "/users/login",
            headers: {
                "Content-type": "application/json"
            },
            data: {
                ...userLoginData
            }
        })
        .then((res) => {
            console.log(res.data)
            Cookies.set("authToken", res.data.token)
            Cookies.set("refreshToken", res.data.refreshToken)

            authContext.setIsAuth(true)
            authContext.setUser(res.data.user)

            swal.fire({
                icon: "success",
                title: "Success!",
                text: "You will be directed to the main menu.",
                customClass: {
                    popup: "swal-custom-popup",
                    icon: "swal-icon",
                    confirmButton: "swal-custom-confirm",
                    cancelButton: "swal-custom-cancel"
                }
            })
            .then(() => {
                navigate("/")
            })
        })
        .catch((err) => {
            if(err.response){
                swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Login failed. Please try again",
                    customClass: {
                        popup: "swal-custom-popup",
                        icon: "swal-icon",
                        confirmButton: "swal-custom-confirm",
                        cancelButton: "swal-custom-cancel"
                    }
                })
                console.log(err.response.data.message)
            }
        })
    }

    return (
        <div className="loginPage_container">
            <div className="welcomingBanner">
                <h1>Enter our <span className="text-emphasize">world</span></h1>
                <img className="imageBanner" src="/images/undraw_login_re_4vu2.svg" alt="Welcome" />
            </div>
            <form className="loginForm" onSubmit={handleLoginSubmit}>
                <h2>Login</h2>
                <input 
                className="loginFormInputs" 
                type="text" 
                placeholder="Username"
                onChange={(ev) => setUserLoginData({...userLoginData, username: ev.target.value})}
                />
                <input 
                className="loginFormInputs" 
                type="password" 
                placeholder="Password"
                onChange={(ev) => setUserLoginData({...userLoginData, password: ev.target.value})}
                />
                <BaseButton buttonText="Login" customClass="loginSubmitButton"/>
                <p className="registrationLink">Doesn't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </div>
    )
}

export default LoginPage
