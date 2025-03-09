import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Draggable from "react-draggable";

import MessageBox from './MessageBox';
import InputBox from './InputBox';
import LegacyButton from '../LegacyButton';
import InputGroup from '../InputGroup';
import { Button, Icons } from '@ohif/ui-next';

const SearchBar = ({
  filtersMeta,
  filterValues,
  onChange,
  clearFilters,
  isFiltering,
  numOfStudies,
  getDataSourceConfigurationComponent,
}) => {
  const { t } = useTranslation('StudyList');
  const { sortBy, sortDirection } = filterValues;
  const filterSorting = { sortBy, sortDirection };
  const setFilterSorting = sortingValues => {
    onChange({
      ...filterValues,
      ...sortingValues,
    });
  };
  const isSortingEnabled = numOfStudies > 0 && numOfStudies <= 100;
  
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
    const messageBox = document.getElementById("user-message-filter") as HTMLInputElement
    const userMessage = messageBox.value;
    if (userMessage == "") { return; }
    messageBox.value = "";

    document.getElementById("send-button-filter").innerHTML = "Loading";
    const response = await fetch("http://localhost:8000/chat/", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Assistant": "filter",
          "Thread": thread,
          "User-message": userMessage
      },
    });
    
    if (response.status == 500) {
        messageBox.placeholder = "Search failed. Please retry."
        document.getElementById("send-button-filter").innerHTML = "Retry";
        return ;
    }

    const data = await response.json();
    const botReply = data.reply;
    console.log(botReply);

    const regex = /^\?([^=&]+=[^&]*)(?:&[^=&]+=[^&]*)*$/;
    const url = botReply.match(regex);
    if (url) {
      window.location.href = "http://localhost:3000/" + botReply;
    }
    else {
      messageBox.placeholder = "Search failed. Please retry."
    }
    
    // const botReply = "Chatbot disabled for testing"

    document.getElementById("send-button-filter").innerHTML = "Send";
  }

  return (
    <>
      <div className='chat-area'>
        {message}
        <InputBox type={"filter"} sendChat={sendChat}/>
      </div>
    </>
  );
};

export default SearchBar;
