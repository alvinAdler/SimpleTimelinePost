import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import './Navbar.css'

import { logout } from '../../utilities/utilityFunctions'
import AuthContext from '../contexts/AuthContext'

const Navbar = () => {

    const location = useLocation()
    const authContext = useContext(AuthContext)

    return (
        <>
            <nav className="nav_container">
                <Link to="/" className={`nav-link ${location.pathname === "/" && "active"}`}>Timeline</Link>
                <Link to="/friends" className={`nav-link ${location.pathname === "/friends" && "active"}`}>Friends</Link>
                <button className='nav-link' onClick={logout}>Logout</button>
                <span>{authContext.user?.username}</span>
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar
