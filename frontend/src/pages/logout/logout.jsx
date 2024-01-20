import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {

    const navigate = useNavigate();

    const clearJwtTokens = () => {
        const sessionJwt = sessionStorage.getItem("jwtToken");
        const localJwt = localStorage.getItem("jwtToken");

        if (sessionJwt) {
            sessionStorage.setItem("jwtToken", null);
        }
        if (localJwt) {
            localStorage.setItem("jwtToken", null);
        }
    }

    useEffect(() => {
        clearJwtTokens();
        navigate('/login');
    })

    return (
        <div>logout</div>
    )
}

export default LogoutPage