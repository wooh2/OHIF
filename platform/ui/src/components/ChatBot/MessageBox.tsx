import React from 'react';

const MessageBox = ({key, type, message}) => {
    if (type === "user") {
        return (
            <div key={key} className="chat message user sticky mx-auto pt-3 pb-3">
                <p>{message}</p>
            </div>
        )
    }
    else {
        return (
            <div key={key} className="chat message sticky mx-auto pt-3 pb-3">
                <p>{message}</p>
            </div>
        )
    }
}

export default MessageBox;