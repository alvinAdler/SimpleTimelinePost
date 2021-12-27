import React from 'react'
import { Link } from 'react-router-dom'

import styles from './LoginPage_master.module.css'

const LoginPage = () => {
    return (
        <div className={styles.loginPage_container}>
            <div className={styles.welcomingBanner}>
                <h1>Enter our <span className="text-emphasize">world</span></h1>
                <img className={styles.imageBanner} src="/images/undraw_login_re_4vu2.svg" alt="Welcome" />
            </div>
            <form className={styles.loginForm}>
                <h2>Login</h2>
                <input className={styles.loginFormInputs} type="text" placeholder="Username"/>
                <input className={styles.loginFormInputs} type="password" placeholder="Password"/>
                <button className={styles.loginSubmitButton} type="submit">Login</button>
                <p className={styles.registrationLink}>Doesn't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </div>
    )
}

export default LoginPage
