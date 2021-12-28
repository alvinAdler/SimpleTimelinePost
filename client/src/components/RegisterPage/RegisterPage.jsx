import React from 'react'

import styles from "./RegisterPage_master.module.css"

const RegisterPage = () => {
    return (
        <div className={styles.registerPageContainer}>
            <form className={styles.registerForm}>
                <h2>Register</h2>
                <input className={styles.registerFormInputs} type="text" placeholder="Username"/>
                <input className={styles.registerFormInputs} type="password" placeholder="Password"/>
                <input className={styles.registerFormInputs} type="password" placeholder="Confirm Password"/>
                <button className={styles.registerSubmitButton} type="submit">Register</button>
            </form>
            <div className={styles.welcomingBanner}>
                <h1>Unite the <span className="text-emphasize">people</span></h1>
                <img className={styles.imageBanner} src="/images/undraw_certification_aif8.svg" alt="Register" />
            </div>
        </div>
    )
}

export default RegisterPage
