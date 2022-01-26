import { Link, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {

    const location = useLocation()

    return (
        <>
            <nav className="nav_container">
                <Link to="/" className={`nav-link ${location.pathname === "/" && "active"}`}>Timeline</Link>
                <Link to="/friends" className={`nav-link ${location.pathname === "/friends" && "active"}`}>Friends</Link>
                <button className='nav-link'>Logout</button>
                <span>UserName</span>
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar
