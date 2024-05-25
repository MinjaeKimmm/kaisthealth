import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoAlertCircle } from "react-icons/io5";

axios.defaults.withCredentials = true;

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginError, setIsLoginError] = useState(false);
    const API = process.env.REACT_APP_API;

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('Attempting login with:', { username, password });
            const response = await axios.post(API + "/auth/login", {
                username,
                password,
            }, {
                withCredentials: true
            });

            console.log('Login response:', response);

            if (response.status === 200) {
                setIsLoginError(false);
                navigate("/");
            } else {
                setIsLoginError(true);
                window.alert(`ERROR: ${response.data}`);
            }
        } catch (e: any) {
            console.error('Login error:', e);
            setIsLoginError(true);
            window.alert(`ERROR: ${e.response ? e.response.data : e.message}`);
        }
        console.log(isLoginError);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                </div>
                <div>
                    <input type="submit" value="Log in" />
                </div>
                {isLoginError && (
                    <>
                        <IoAlertCircle className="validIcon" size="15" />
                        <p>Incorrect username or password.</p>
                    </>
                )}
            </form>
        </div>
    );
};

export default LoginPage;
