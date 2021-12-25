import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <>
        <nav className={styles.nav_container}>
            <span>Timeline</span>
            <span>Friends</span>
            <span>Logout</span>
            <span>UserName</span>
        </nav>
        <Outlet/>
        </>
    )
}

export default Navbar
