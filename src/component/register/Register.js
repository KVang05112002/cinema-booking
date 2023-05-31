import React, { useState } from 'react';
import './register.scss';
import bg from '../../assets/footer-bg.jpg';
import bgl from '../../assets/background-logo.jpg';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import { register } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispath = useDispatch();
    const history = useHistory();


    const handleRegister = async (e) => {
        // e.preventDefault();

        const newUser = {
            email: email,
            username: username,
            password: password
        }
        if (email && email.length > 0 && username && username.length > 0 && password && password.length > 0) {
            register(newUser, dispath, history.push('/login'));
            toast.success('Register successfull');
        } else {
            toast.error('Empty username or password or username');
        }

    }

    return (
        <>
            <div className="background-logo" style={{ backgroundImage: `url(${bg})` }}> </div>
            <div className='form-register'>
                <div className="form-register__img" style={{ backgroundImage: `url(${bgl})` }}></div>
                <div className='form-register__content'>
                    <h2>Register</h2>
                    <div className='form-register__content__usename'>
                        <h3>Username</h3>
                        <input type='text' placeholder='Username' value={username} onChange={(event) => setUsername(event.target.value)}></input>
                    </div>
                    <div className='form-register__content__phone'>
                        <h3>Email</h3>
                        <input type='text' placeholder='Your Email' value={email} onChange={(event) => setEmail(event.target.value)}></input>
                    </div>
                    <div className='form-register__content__password'>
                        <h3>Password</h3>
                        <input type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    </div>
                    <Button className="form-register__content__button-register" onClick={handleRegister}>Register</Button>
                    <div className="form-register__content__signin">
                        <h4>Have an account </h4>
                        <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;