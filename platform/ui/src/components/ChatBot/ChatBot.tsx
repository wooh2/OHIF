import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import * as Icon from 'react-bootstrap-icons';
import MessageBox from './MessageBox';
import InputBox from './InputBox';

const ChatBot = () => {  
  const [open, setOpen] = useState(true);
  const [thread, setThread] = useState(null);
  const [message, setMessage] = useState([]);
  const textArea = useRef();

  useEffect(() => {
    fetch("http://localhost:8000/thread/")
    .then(response => response.json())
    .then(data => setThread(data.thread))
    .catch(error => console.error('Error:', error));
  },[]);

  useEffect(() => {
    const area = textArea.current;
    if (area) {
      area.scrollTop = area.scrollHeight;
    }
  });

  const sendChat = async () => {
    const messageBox = document.getElementById("user-message-analysis") as HTMLInputElement
    const userMessage = messageBox.value;
    if (userMessage == "") { return; }
    messageBox.value = "";

    document.getElementById("send-button-analysis").innerHTML = "Loading";
    const response = await fetch("http://localhost:8000/chat/", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Assistant": "analysis",
          "Thread": thread,
          "User-message": userMessage
      },
    });
    
    if (response.status == 500) {
      setMessage(message.concat(<MessageBox type={"bot"} message={"Failed to send chat."}/>));
      document.getElementById("send-button-analysis").innerHTML = "Retry";
      return ;
    }

    const data = await response.json();
    const botReply = data.reply;
    console.log(botReply);
    
    // const botReply = "Chatbot disabled for testing"

    setMessage(message.concat(<MessageBox type={"user"} message={userMessage}/>))
    setMessage(message.concat(<MessageBox type={"bot"} message={botReply}/>));
    document.getElementById("send-button-analysis").innerHTML = "Send";
  }

  return (
    <>
      <div>
        {!open && (
          <motion.div
            onClick={() => setOpen(true)}
            initial={{ scale: 0 }}
            animate={{ scale: 1, x: window.innerWidth - 100, y: 20 }}
          >
            <Icon.ChatDotsFill 
              color="white"
              size={84}
            />
          </motion.div>
        )}

        {/* Draggable Chat Window */}
        {open && (
          <Draggable>
            <motion.div
              className="chat-container"
              initial={{ opacity: 0, x: window.innerWidth - 700, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              dragConstraints={{ left: 0, right: window.innerWidth - 300, top: 0, bottom: window.innerHeight - 400 }}
              drag
            >
              <div className="chat-header">
                <span>Chatbot</span>
                <button style={{float: 'right'}} onClick={() => setOpen(false)}>
                  <Icon.XCircleFill 
                    color="black"
                    size={48}
                  />
                </button>
              </div>
              {message}
              <InputBox type={"analysis"} sendChat={sendChat}/>
            </motion.div>
          </Draggable>
        )}
      </div>
    </>
  );
};

export default ChatBot;
