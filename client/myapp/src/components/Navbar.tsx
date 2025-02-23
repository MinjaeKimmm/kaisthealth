import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Navbar = () => {
    const icon = "/img/icon.jpg";

    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const API = process.env.REACT_APP_API;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1000) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        axios.get(API + "/auth/isSessionValid")
          .then(response => setIsLoggedIn(response.data))
          .catch(err => console.error('Error fetching session status', err));
    }, [setIsLoggedIn, API]);
    
    const handleLogout = () => {
        axios.post(API + "/auth/logout")
          .then(() => setIsLoggedIn(false))
          .catch(err => console.error('Error logging out:', err));
    }

    return (
        <>
            <nav className="nav container">
                <NavLink to="/" className="nav__logo">
                    <img src={icon} alt="Logo" className="nav__logo-img"/>
                </NavLink>
                
                <div className={`nav__menu ${menuOpen ? 'show-menu' : ''}`} id="nav-menu">
                    <ul className="nav__list menu">
                        <li className="nav__item">
                            <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav__item dropdown">
                            <a className="nav__link">Gyms</a>
                            <ul className="submenu">
                                <li><NavLink to="/Auditorium" className="nav__link" onClick={closeMenuOnMobile}>Auditorium</NavLink></li>
                                <li><NavLink to="/Heemang" className="nav__link" onClick={closeMenuOnMobile}>Heemang</NavLink></li>
                                <li><NavLink to="/Mir" className="nav__link" onClick={closeMenuOnMobile}>Mir</NavLink></li>
                                <li><NavLink to="/Silloe" className="nav__link" onClick={closeMenuOnMobile}>Silloe</NavLink></li>
                                <li><NavLink to="/Yeoul" className="nav__link" onClick={closeMenuOnMobile}>Yeoul</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/equipments" className="nav__link" onClick={closeMenuOnMobile}>
                                Equipments
                            </NavLink>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="nav__item">
                                    <NavLink to="/dashboard" className="nav__link" onClick={closeMenuOnMobile}>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav__item">
                                    <NavLink to="/" className="nav__login nav__link" onClick={() => { handleLogout(); closeMenuOnMobile(); }}>
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink to="/login" className="nav__login nav__link" onClick={closeMenuOnMobile}>
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                        <IoClose />
                    </div>
                </div>

                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                    <IoMenu />
                </div>
            </nav>
        </>
    );
};

export default Navbar;
