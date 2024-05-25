import React, { useState, useEffect } from 'react';
import { isAssertionExpression } from 'typescript';
import axios from 'axios';
import { IoAlertCircle } from "react-icons/io5"

const SignupPage = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [usernameAvailable, setUsernameAvailable] = React.useState(true);
    const API = process.env.REACT_APP_API;

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
            console.log(API);
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
            window.alert('Signup successful');
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
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <span style = {{ color: 'red' }}><div>{validateUsername()}</div></span>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span style = {{ color: 'red'}}><div>{validatePassword()}</div></span>
                </div>
                <div>
                    <input 
                        disabled={!isFormValid()}
                        type="submit" 
                        value="Signup" 
                    />
                </div>
            </form>
        </div>
    );
};

export default SignupPage;