import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'

import "./RegisterPage_master.css"

import customAxios from '../utilities/customAxios'
import BaseButton from '../utilityComponents/Buttons/BaseButton/BaseButton'

const RegisterPage = () => {

    const [userRegData, setUserRegData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    const handleRegistrationSubmit = (ev) => {
        ev.preventDefault()

        if(Object.values(userRegData).includes("")){
            swal.fire({
                icon: "error",
                title: "A field is empty!",
                text: "Please fill out all input fields",
                confirmButtonColor: "#2285e4"
            })
            return
        }
        else if(userRegData.password !== userRegData.confirmPassword){
            swal.fire({
                icon: "error",
                title: "Password confirmation mismatch!",
                text: "Please match the password in the \"Password\" field and the \"Confirm Password\" field",
                confirmButtonColor: "#2285e4"
            })
            return
        }

        customAxios({
            method: "POST",
            url: "/users/register",
            headers: {
                "Content-type": "application/json"
            },
            data: {
                username: userRegData.username,
                password: userRegData.password
            }
        })
        .then((res) => {
            swal.fire({
                icon: "success",
                title: "Success!",
                text: `${res.data.message}. You will be redirected to the login page`,
                customClass: {
                    popup: "swal-custom-popup",
                    icon: "swal-icon",
                    confirmButton: "swal-custom-confirm",
                    cancelButton: "swal-custom-cancel"
                }
            })
            .then(() => {
                navigate("/login")
            })
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
                <BaseButton buttonText="Register" customClass="registerSubmitButton"/>
            </form>
            <div className="welcomingBanner">
                <h1>Unite the <span className="text-emphasize">people</span></h1>
                <img className="imageBanner" src="/images/undraw_certification_aif8.svg" alt="Register" />
            </div>
        </div>
    )
}

export default RegisterPage
