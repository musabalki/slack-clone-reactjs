import { Button } from '@mui/material';
import React,{useState} from 'react'
import styled from 'styled-components';
import { collection, addDoc,serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";

function ChatInput({channelName,channelId,chatRef}) {
    const [input,setInput] = useState('');
    const [user, loading] = useAuthState(auth);

    const sendMessage = e  =>{
        e.preventDefault();
        if(!channelId){
            return false;
        }
        addMessage();
    }

     async function addMessage (){
       //const messageRef = collection(db, "rooms",channelId,"messages"); addDoc()
       //const messageRef = doc(collection(db, "rooms", channelId, "messages"));
       const messageRef = collection(db, "rooms", channelId, "messages");
       chatRef.current.scrollIntoView({behavior:"smooth"});
       const docRef =  await addDoc(messageRef,{message:input,timestamp:serverTimestamp(),user:user.displayName,userImage:user.photoURL});
       setInput("");
    }

  return (
    <ChatInputContainer>
        <form>
            <input onChange={e=>setInput(e.target.value)} value={input} placeholder={`Messages #${channelName}`} />
            <Button hidden  type="submit" onClick={sendMessage}>
                SEND
            </Button>
        </form>
    </ChatInputContainer>
  )
}

export default ChatInput;

const ChatInputContainer = styled.div`
border-radius:20px;
>form {
    position:relative;
    display:flex;
    justify-content-center;
}
> form >input {
    position:fixed;
    bottom:30px;
    width:60%;
    border:1px solid gray;
    border-radius:3px;
    padding:20px;
    outline:none;
}
>form > button {
    display:none
}
`;