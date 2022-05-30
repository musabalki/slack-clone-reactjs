import React, { useEffect, useState,useRef } from 'react'
import styled from 'styled-components';
import InfoIcon from '@mui/icons-material/Info';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { selectRoomId } from "../features/appSlice";
import { useSelector } from "react-redux";
import ChatInput from './ChatInput';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, getDoc, doc,query,orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Message from './Message';

function Chat() {
  const chatRef=useRef(null);
  const [channelName,setChannelName] = useState("");
  const roomId = useSelector(selectRoomId);
  const q = query(collection(db,`rooms/${roomId}/messages`),orderBy("timestamp"));
  const [messages,loading,error] = useCollectionData(q);

  var docRef;
  var docYed;

  useEffect(()=>{
    chatRef?.current?.scrollIntoView({behavior:"smooth"});
  },[roomId,loading]);

  if(!roomId){
    return <ChatContainer><h1>Hello, select channel</h1></ChatContainer>
  }
     
  if (roomId) {
    docRef = doc(db, "rooms", roomId);
  }
 
  getMessage();

  async function getMessage() {
    docYed = await getDoc(docRef);
    if (docYed.exists()) {
      setChannelName(docYed.data().name);
    }
  }
  
  return (
    <ChatContainer>
      {docRef && messages && (
        <>
        <Header>
          <HeaderLeft>
            <h4> <strong>{`#${channelName}`}</strong> </h4>
            <StarOutlineIcon />
          </HeaderLeft>
          <HeaderRight>
            <p>
              <InfoIcon />Details
            </p>
          </HeaderRight>
        </Header>
        <ChatMessages>
          {messages?.map((message)=>{
            return <Message timestamp={message.timestamp} message={message.message} user={message.user} userImage={message.userImage}  />
          })}
          <ChatBottom ref={chatRef} />
        </ChatMessages>
        <ChatInput channelName={channelName}
          channelId={roomId} chatRef={chatRef}
        />
      </>
      )}
      
    </ChatContainer>
  )
}

export default Chat;

const ChatBottom= styled.div`padding-bottom:200px`;

const ChatMessages = styled.div``;

const Header = styled.div`
display:flex;
justify-content:space-between;
padding:20px;
border-bottom:1px solid lightgray
`;

const HeaderLeft = styled.div`
display:flex;
align-items:center;

> h4{
  display:flex;
  margin-right:10px;
  text-transform:lowercase;
}

> h4 > .MuiSvgIcon-root{
  margin-left:10px;
  font-size:18px;
}
`;

const HeaderRight = styled.div`
>p {
  display:flex;
align-items:center;
}

>p > .MuiSvgIcon-root{
  margin-right:5px !important;
  font-size:16px;
}
`;

const ChatContainer = styled.div`
flex-grow:1;
flex:0.7;
overflow-y:scroll;
margin-top:60px;
text-align:left;
margin-left:10px;
`;