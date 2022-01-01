import React from 'react'
import { Link } from 'react-router-dom'

import'./LoginPage_master.css'

const LoginPage = () => {
    return (
        <div className="loginPage_container">
            <div className="welcomingBanner">
                <h1>Enter our <span className="text-emphasize">world</span></h1>
                <img className="imageBanner" src="/images/undraw_login_re_4vu2.svg" alt="Welcome" />
            </div>
            <form className="loginForm">
                <h2>Login</h2>
                <input className="loginFormInputs" type="text" placeholder="Username"/>
                <input className="loginFormInputs" type="password" placeholder="Password"/>
                <button className="loginSubmitButton" type="submit">Login</button>
                <p className="registrationLink">Doesn't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </div>
    )
}

export default LoginPage
