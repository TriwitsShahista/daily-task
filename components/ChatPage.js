import React, {useState,useEffect} from 'react';
import axios from "axios";
import {useNavigate,useLocation} from 'react-router-dom';
import {ChatEngine, getOrCreateChat} from 'react-chat-engine'

const ChatPage = () => {

  const [data,setData] = useState([])
  const initializeEvent = () => {
  axios.get("http://192.168.0.115/testAPI/api/Chat/fetchTestPrac")
  .then((res) => {
  console.log(res.data);
  setData(res.data)
  })
  };
  useEffect(() => initializeEvent(), []);

    return(
        <ChatEngine
        height='100vh'
        width='100vw'
        userName='alexa'
        userSecret ='alexa623'
        projectID ='cc7662f3-b128-4109-9a19-f299d36a6527'
        />
    )
}
export default ChatPage;




