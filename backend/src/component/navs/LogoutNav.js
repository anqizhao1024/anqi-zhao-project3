import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";


export default function LoginNav() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/signup")
    };

    const handleSignIn = () => {
        navigate("/signin")
    }

    return (
        <div style={{display: "flex", textAlign: "center"}}>
            <Button
                onClick={handleSignUp}
                style={{textTransform: 'none', color: "white"}}
            >
                Sign Up
            </Button>
            <Button
                onClick={handleSignIn}
                style={{textTransform: 'none', color: "white"}}
            >
                Sign in
            </Button>
        </div>
    );
}