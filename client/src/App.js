import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import "./App.css";

import Navbar from './components/utilityComponents/Navbar/Navbar';
import TimelinesPage from './components/TimelinesPage/TimelinesPage';
import LoginPage from './components/LoginPage/LoginPage';
import FriendsPage from './components/FriendsPage/FriendsPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import AuthContext from './components/utilityComponents/contexts/AuthContext';
import RequireAuth from './components/utilityComponents/RequireAuth';

// This is a simple comment in the App.js file

function App() {

    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({});

    return (
        <div className="App">
            <AuthContext.Provider value={{isAuth, setIsAuth, user, setUser}}>
                <Routes>
                    {/* <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/> */}

                    <Route path="/login" element={<RequireAuth><LoginPage/></RequireAuth>}/>
                    <Route path="/register" element={<RequireAuth><RegisterPage/></RequireAuth>}/>

                    <Route path="/" element={<Navbar/>}>
                        <Route index element={<RequireAuth><TimelinesPage/></RequireAuth>}/>
                        <Route path="/friends" element={<RequireAuth><FriendsPage/></RequireAuth>}/>

                        {/* <Route index element={<TimelinesPage/>}/>
                        <Route path="/friends" element={<FriendsPage/>}/> */}
                    </Route>

                </Routes>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
