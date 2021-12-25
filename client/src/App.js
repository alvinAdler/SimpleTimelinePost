import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./App.css";

import Navbar from './components/utilityComponents/Navbar/Navbar';
import TimelinesPage from './components/TimelinesPage/TimelinesPage';
import LoginPage from './components/LoginPage/LoginPage';
import FriendsPage from './components/FriendsPage/FriendsPage';
import RegisterPage from './components/RegisterPage/RegisterPage';


function App() {
    return (
        <div className="App">
			<Router>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>

                    <Route path="/" element={<Navbar/>}>
                        <Route index element={<TimelinesPage/>}/>
                        <Route path="/friends" element={<FriendsPage/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
