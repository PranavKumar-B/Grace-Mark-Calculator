import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo.png"
import axios from 'axios'
const Navbar = () => {
	const navigate = useNavigate()
	// axios.defaults.withCredentials = true;
    const handleLogout = () => {
        // console.log("Logging Out!")
		axios.get('http://localhost:3005/logout')
		.then(res => {
			navigate('/login')
		}).catch(err => console.log(err));
	}
    return(
        <div className='navbar'>
            <div className="container">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="links">
                    <Link className="link" to="/">
                        <h6>Home</h6>
                    </Link>
                    <Link className="link" to="/marks">
                        <h6>Marks</h6>
                    </Link>
                    <Link className="link" to="/attendance">
                        <h6>Attendance</h6>
                    </Link>
                    <Link className="link" to="/calculator">
                        <h6>Calculator</h6>
                    </Link>
                    <Link className="link" to="/visualization">
                        <h6>Visualization</h6>
                    </Link>
                    <span className="logout">
                        
                        <Link className="link" onClick={handleLogout}>Logout</Link>
                        {/* <h6 onClick={handleLogout} >Logout</h6> */}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar