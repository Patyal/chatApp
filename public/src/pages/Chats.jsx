import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import {io} from "socket.io-client";
import ChatContainer from '../components/ChatContainer';


function Chats() {

  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat,setCurrentChat]= useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  

  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
        setIsLoaded(true);
      }
    };
  
    fetchUser();
  }, []);


  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);


    }
},[currentUser])
  
  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
  
    fetchContacts();
  }, [currentUser]);

  

  const handelChatChange = (chat) => {

    setCurrentChat(chat);

  }
  

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts= {contacts} currentUser = {currentUser} changeChat = {handelChatChange}/>
          {

           isLoaded && currentChat === undefined ?( 
           <Welcome currentUser = {currentUser}/>) : (<ChatContainer currentChat = {currentChat} currentUser = {currentUser} socket = {socket}/>)

          }
          
        </div>
      </Container>
    </>
  )
}


const Container = styled.div`

      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      align-items: center;
      background-color: #131324;
      .container {
          height: 85vh;
          width: 85vw;
          background-color: #00000076;
          display: grid;
          grid-template-columns: 25% 75%;
          @media screen and (min-width:720px) and (max-width: 1080px){
          grid-template-columns: 35% and 65%;
          }
      }


`;
export default Chats
