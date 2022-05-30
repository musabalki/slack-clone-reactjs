import React from 'react';
import './App.css';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import styled from "styled-components"
import Chat from './components/Chat';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login"
import Spinner from "react-spinkit"
import Logo from "../src/logo.png"

function App() {
  const [user, loading] = useAuthState(auth);
  
  if (loading) {
    return (<AppLoading>
      <AppLoadingContents>
        <img src={Logo}  alt="" />
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </AppLoadingContents>
    </AppLoading>)
  }

  return (
    <div className="App">
      <BrowserRouter>
        {!user ? (<Login />) : <>
          <Header />
          <AppBody>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Chat />} />
            </Routes>
          </AppBody>
        </>
        }
      </BrowserRouter>
    </div>
  );
  
}

export default App;

const AppBody = styled.div`
  display:flex;
  height:100vh;
`;

const AppLoading = styled.div`
height:100vh;
`;

const AppLoadingContents = styled.div`
text-align:center;
height:100vh;
padding-bottom:100px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

>img{
  height:100px;
  padding:20px;
}
`;