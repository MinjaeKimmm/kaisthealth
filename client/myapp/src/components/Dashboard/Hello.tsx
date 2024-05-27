import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import "./Hello.css";

const Hello = () => {
    const API = process.env.REACT_APP_API;
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [username, setUsername] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const sessionResponse = await axios.get(API + `/auth/isSessionValid`);
                setIsLoggedIn(sessionResponse.data);
                if (sessionResponse.data) {
                    const usernameResponse = await axios.get(API + `/auth/returnUsername`);
                    setUsername(usernameResponse.data);
                }
            } catch (err) {
                console.error('Error fetching session or username', err);
            }
        })();
    }, [API, setIsLoggedIn]);

    return (
        <h1 className="hello">Hello, {isLoggedIn ? username : "world"}!</h1>
    );
};

export default Hello;
