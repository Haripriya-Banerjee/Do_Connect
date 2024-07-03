import React, { useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import './chat.css';
import './chapPage.css';

const ChatPage = ({socket, currentUser, setCurrentUser}) => {
  const [myIndex, setMyIndex] = useState(-1);
  return (
    socket &&
    <div className="container">
      {
        (!currentUser) &&
        <div className='noActive'>
            <img src="https://herobot.app/wp-content/uploads/2022/11/11-Reasons-Why-A-Chat-Application-Is-Great-For-Business_1.jpg" alt="No user"/>
        </div>
      }
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <ChatBar socket={socket} currentUser={currentUser} setCurrentUser={setCurrentUser} myIndex={myIndex} setMyIndex={setMyIndex}/>
            <ChatBody socket={socket} currentUser={currentUser} myIndex={myIndex}/>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ChatPage;