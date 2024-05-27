import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoAlertCircle } from "react-icons/io5";
import { useAuth } from '../AuthContext';
import '../components/Auth.css';

axios.defaults.withCredentials = true;

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginError, setIsLoginError] = useState(false);
    const API = process.env.REACT_APP_API;
    const { setIsLoggedIn } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(API + "/auth/login", {
                username,
                password,
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setIsLoginError(false);
                setIsLoggedIn(true);
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
        <section className="page auth">
          <div className="auth-background"></div>
          <div className="auth-card">
            <h2>Welcome Back!</h2>
            <form onSubmit={handleLogin}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="auth-input"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
                <input type="submit" value="Log in" className="auth-button" />
              {isLoginError && (
                <div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>
                  <IoAlertCircle className="validIcon" size="15" />
                  <p style={{ marginLeft: '5px' }}>Incorrect username or password.</p>
                </div>
              )}
            </form>
            <footer>
              Need an account? Sign up <a href="/Signup">here</a>
            </footer>
          </div>
        </section>
    );
};

export default LoginPage;
