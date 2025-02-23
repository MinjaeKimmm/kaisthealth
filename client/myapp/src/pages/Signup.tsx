import React, { useState, useEffect } from 'react';
import { isAssertionExpression } from 'typescript';
import axios from 'axios';
import { IoAlertCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';
import '../components/Auth.css';

const SignupPage = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [usernameAvailable, setUsernameAvailable] = React.useState(true);
    const API = process.env.REACT_APP_API;
    const { setIsLoggedIn } = useAuth();

    const navigate = useNavigate();

    const minIDLen = 3;
    const maxIDLen = 25;
    const minPWLen = 5;
    const maxPWLen = 256;

    const alertIcon = (
        <IoAlertCircle
            className="validIcon"
            size="15"
        />
    );


    React.useEffect(()=> {
        const checkUsernameAvailability = async () => {
            const response = await axios.get(API + "/auth/findUsername", {
                params: { username }
            });
            setUsernameAvailable(!response.data); 
        };

        if (username) {
            const timeoutId = setTimeout(checkUsernameAvailability, 300);
            return () => clearTimeout(timeoutId);
        }
    }, [username]);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(API + "/auth/signup", {
                username,
                password,
            });
            await axios.post(API + "/auth/login", {
                username,
                password,
            }, { withCredentials: true });
            window.alert('Signup and login successful');
            setIsLoggedIn(true);
            navigate("/");
        } catch (e) {
            window.alert(`ERROR: ${e}`);
        }
    }

    const validateUsername = () => {
        if (username.trim() === "") return null;
        if (username.length < minIDLen) return <>{alertIcon}Please enter more than {minIDLen} characters</>;
        if (username.length > maxIDLen) return <>{alertIcon}Please enter less than {maxIDLen} characters</>;
        if (!usernameAvailable) return <>{alertIcon}Username already taken</>;
    }

    const validatePassword = () => {
        if (password.trim() === "") return null;
        if (password.length < minPWLen) return <>{alertIcon}Please enter more than {minPWLen} characters</>;
        if (password.length > maxPWLen) return <>{alertIcon}Please enter less than {maxPWLen} characters</>;
    }

    const isFormValid = () => {
        return (
            username.trim() !== "" &&
            username.length >= minIDLen &&
            username.length <= maxIDLen &&
            password.trim() !== "" &&
            password.length >= minPWLen &&
            password.length <= maxPWLen &&
            usernameAvailable
        );
    };

    return (
        <section className="page auth">
            <div className="auth-background"></div>
                <div className="auth-card">
                    <h2>Signup Here!</h2>
                    <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="auth-input"
                    />
                    <span style={{ color: 'red' }}>
                        <div>{validateUsername()}</div>
                    </span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                    />
                    <span style={{ color: 'red' }}>
                        <div>{validatePassword()}</div>
                    </span>
                    <input
                        type="submit"
                        value="Signup"
                        className="auth-button"
                        disabled={!isFormValid()}
                    />
                </form>
                <footer>
                    Already have an account? Log in <a href="/Login">here</a>
                </footer>
            </div>
        </section>
    );
};

export default SignupPage;