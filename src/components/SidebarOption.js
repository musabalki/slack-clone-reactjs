import React from 'react';
import styled from "styled-components";
import { db } from "../firebase";
import { firebaseApp } from "../firebase";
import { getFirestore } from "firebase/firestore";

import { collection, addDoc } from "firebase/firestore";

import { useCollection } from 'react-firebase-hooks/firestore';
import { enterRoom } from '../features/appSlice';
import { useDispatch } from "react-redux";


function SidebarOption({ id, Icon, title, addChannelOption }) {
    const dispatch=useDispatch();

    const [channels, loading, error] = useCollection(collection(getFirestore(firebaseApp), 'rooms'));
    
    const addChannel = () => {
        const channelName = prompt('Please enter the channel name');
        if (channelName) {
            try {
                addDoc(collection(db, "rooms"), {
                    name: channelName
                });
            } catch (e) {

            }
        }
    }
    const selectChannel = () => {
        if(id){
            dispatch(enterRoom({roomId:id}));
        }
    }

    return (
        <SidebarOptionContainer onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon fontSize="small" style={{ padding: 5 }} />}
            {Icon ? (<h3> {title} </h3>) : (<SidebarOptionChannel><span>#</span>{title}</SidebarOptionChannel>)}
        </SidebarOptionContainer>
    )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
display:flex;
font-size:12px;
align-items:center;
padding-left:2px;
cursor:pointer;
:hover {
    opacity:0.9;
    background-color:#340e36;
}
> h3{
    font-weight:400;
}
> h3 > span {
    padding:15px;
}
`;

const SidebarOptionChannel = styled.h3`
padding:10px 0;
font-weight:300;
`;