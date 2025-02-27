import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import MessageBox from './MessageBox';
import LegacyButton from '../LegacyButton';
import InputGroup from '../InputGroup';
import { Button, Icons } from '@ohif/ui-next';

const ChatBot = ({
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
  
  const [assistant, setAssistant] = useState(null);
  const [thread, setThread] = useState(null);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/assistant/")
    .then(response => response.json())
    .then(data => setAssistant(data.assistant))
    .catch(error => console.error('Error:', error));

    fetch("http://localhost:8000/thread/")
    .then(response => response.json())
    .then(data => setThread(data.thread))
    .catch(error => console.error('Error:', error));
  },[]);

  async function sendChat() {
    console.log("Send Chat")
    const userMessage = (document.getElementById("user-message") as HTMLInputElement).value;
    console.log(userMessage)
    if (userMessage == "") { return; }

    document.getElementById("send-button").innerHTML = "Loading";
    const response = await fetch("http://localhost:8000/chat/", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Assistant": assistant,
          "Thread": thread,
          "User-message": userMessage
      },
    });
  
    const data = await response.json();
    const botReply = data.reply;
    console.log(botReply);

    setMessage(message.concat(<MessageBox message={botReply}/>));
    document.getElementById("send-button").innerHTML = "Send";
  }

  return (
    <>
      <div className='chat-area'>
        {message}
      </div>
      <div className="sticky mx-auto pt-3 pb-3">
        <input
          id="user-message"
          className="chat question placeholder:text-gray-100 placeholder:italic"
          placeholder="Ask me anything about the dataset..."
          type="text"
          name="search"
        />
        <LegacyButton 
          id="send-button"
          rounded="full"
          variant="outlined"
          color="primaryActive"
          border="primaryActive"
          onClick={sendChat}
          >
            Send
        </LegacyButton>
      </div>
    </>
  );
};

export default ChatBot;
