import React, { useState } from "react";
import './login.scss';
import bg from '../../assets/footer-bg.jpg';
import bgl from '../../assets/background-logo.jpg';
import Button from "../button/Button";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";


const Login = (props) => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    // const id = '';
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        //event.preventDefault();
        FuncLogin(username, password);
    }

    const FuncLogin = async (username, password) => {
        const urlAPI = `https://localhost:7181/api/Auth/login-customer?username=${username}&password=${password}`;
        const data = { username, password };
        try {
            const res = await axios.post(urlAPI, data);
            console.log(res.data, 'tetst')
            localStorage.setItem('token', res.data);
            localStorage.setItem('username', username);
            // localStorage.setItem('id', id)

            if (res.status === 200) {
                history.push('/');
                toast.success('Login successfull.');
                window.location.reload();
            }

        } catch (err) {
            if (err.response.status === 400) {
                toast.error('username or password incorrect.')
            }
        }

    }


    return (
        <>
            <div className="background-logo" style={{ backgroundImage: `url(${bg})` }}> </div>
            <div className="form-login">
                <div className="form-login__imges" style={{ backgroundImage: `url(${bgl})` }}></div>
                <h2>Sign in</h2>
                <div className="form-login__content">
                    <div className="form-login__content__username">
                        <h3>Username</h3>
                        <input
                            id='username'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            type="text"
                            placeholder="username" />
                    </div>
                    <div className="form-login__content__password">
                        <h3>Password</h3>
                        <input
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="password" />
                    </div>
                </div>
                <Button className="form-login__button-login" onClick={handleSubmit}>Sign In</Button>
                <div className="form-login__signup">
                    <h4>Not a member? </h4>
                    <Link to="/register">Sign up</Link>
                </div>

            </div>
        </>
    )
}

export default Login;