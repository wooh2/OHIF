import React from 'react';
import LegacyButton from '../LegacyButton';

const InputBox = ({type, sendChat}) => {
    let placeholderText: string;
    if (type === "filter") {
        placeholderText = "What are you looking for? Ask here."
    }
    else {
        placeholderText = "Ask anything about the dataset..."
    }
    return (
        <div className="sticky mx-auto pt-3 pb-3">
            <input
                id={"user-message-" + type}
                className="chat placeholder:text-gray-100 placeholder:italic"
                placeholder={placeholderText}
                type="text"
                name="search"
            />
            <LegacyButton 
                id={"send-button-" + type}
                rounded="full"
                variant="contained"
                color="primary"
                onClick={sendChat}
            >
                Send
            </LegacyButton>
        </div>
    )
}
export default InputBox;