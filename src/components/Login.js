import React from 'react'
import styled from 'styled-components';
import { Button } from "@mui/material";
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import Logo from "../../src/logo.png"

function Login() {

    const singIn = (e) => {
        signInWithPopup(auth, provider).then((res) => {  })
        e.preventDefault();
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src={Logo} alt="" />
                {/*<h1>Sign in</h1>*/}
                <Button type="submit" onClick={singIn}>
                    Sign in with Google
                </Button>
            </LoginInnerContainer>
        </LoginContainer>
    )

}

export default Login;

const LoginContainer = styled.div`
background-color:#f8f8f8;
height:100vh;
display:grid;
place-items:center;
`;

const LoginInnerContainer = styled.div`;
padding:100px;
text-align:center;
background-color:white;
border-radius:10px;
box-shadow:0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

>img {
    object-fit:contain;
    height:100px;
    margin-bottom:40px;
}

>button {
    margin-top:10px;
    text-transform:inherit !important;
    background-color:#0a8d48 !important;
    color:white;
}

`;

