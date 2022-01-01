import React, { useState } from 'react'

import "./RegisterPage_master.css"

import customAxios from '../utilities/customAxios'

const RegisterPage = () => {

    const [userRegData, setUserRegData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    const handleRegistrationSubmit = (ev) => {
        ev.preventDefault()

        if(Object.values(userRegData).includes("")){
            alert("Please fill all field")
            return
        }
        else if(userRegData.password !== userRegData.confirmPassword){
            alert("Password does not match. Password and confirm password must match")
            return
        }

        customAxios({
            method: "POST",
            url: "/user/register",
            headers: {
                "Content-type": "application/json"
            },
            data: {
                username: userRegData.username,
                password: userRegData.password
            }
        })
        .then((res) => {
            alert(res.data.message)
        })
        .catch((err) => {
            if(err.response){
                console.log(err.response)
                alert(err.response.data.message)
            }
        })
    }

    return (
        <div className="registerPageContainer">
            <form className="registerForm" onSubmit={handleRegistrationSubmit}>
                <h2>Register</h2>
                <input className="registerFormInputs" type="text" placeholder="Username"
                onChange={(ev) => setUserRegData({...userRegData, username: ev.target.value})}
                />
                <input className="registerFormInputs" type="password" placeholder="Password"
                onChange={(ev) => setUserRegData({...userRegData, password: ev.target.value})}
                />
                <input className="registerFormInputs" type="password" placeholder="Confirm Password"
                onChange={(ev) => setUserRegData({...userRegData, confirmPassword: ev.target.value})}
                />
                <button className="registerSubmitButton" type="submit">Register</button>
            </form>
            <div className="welcomingBanner">
                <h1>Unite the <span className="text-emphasize">people</span></h1>
                <img className="imageBanner" src="/images/undraw_certification_aif8.svg" alt="Register" />
            </div>
        </div>
    )
}

export default RegisterPage
