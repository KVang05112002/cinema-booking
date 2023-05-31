import React, { useRef, useEffect, useState } from "react";
import './header.scss';

import { Link, useHistory, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import axios from "axios";
import { Button } from "@mui/material";

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'Booking',
        path: '/booking'
    },
    {
        display: 'Login',
        path: '/login'
    }
]
const Header = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const active = headerNav.findIndex(e => e.path === pathname);

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect((e) => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        async function fetchCurrentUser() {
            try {
                setUser(username);
                console.log('check>>> ', username);
            } catch (error) {
                console.error(error);
            }
        }
        if (token) {
            fetchCurrentUser();
            setIsLoggedIn(true);
        }
    }, [user])

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        history.push('/login');


    }



    // useEffect(() => {
    //     const shrinkHeader = () => {
    //         document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 ? headerRef.current.classList.add('shrink') : headerRef.current.classList.remove('shrink');
    //     }
    //     window.addEventListener('scroll', shrinkHeader);
    //     return () => {
    //         window.removeEventListener('scroll', shrinkHeader);
    //     }
    // }, [])



    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={Logo} alt="" />
                    <Link to="/">NVH</Link>
                </div>

                <ul className='header__nav'>
                    <li className={`${active ? 'active' : ''}`}>
                        <Link to='/'>
                            Home
                        </Link>
                    </li>
                    <li className={`${headerNav.display === active ? 'active' : ''}`}>
                        <Link to='/movie'>
                            Movie
                        </Link>
                    </li>
                    <li className={`${headerNav.display === active ? 'active' : ''}`}>
                        <Link to='/booking'>
                            Booking
                        </Link>
                    </li>
                    <li className={`${headerNav.display === active ? 'active' : ''}`}>
                        {isLoggedIn && user ?
                            <div className="user">
                                {user.slice(0, 1)}
                            </div>
                            :
                            <Link to='/login' >
                                Login
                            </Link>
                        }
                    </li>
                    <li className={`${headerNav.display === active ? 'active' : ''}`}>
                        {isLoggedIn && user ?
                            <div onClick={handleLogout} className="logout" style={{ cursor: 'pointer' }}>Log out</div>
                            :
                            ''
                        }
                    </li>

                </ul>

            </div>
        </div>
    )
}

export default Header;