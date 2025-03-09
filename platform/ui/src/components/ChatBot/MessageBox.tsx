import React from 'react';

const MessageBox = ({type, message}) => {
    if (type === "user") {
        return (
            <div className="chat message sticky mx-auto pt-3 pb-3">
                <p>{message}</p>
            </div>
        )
    }
    else {
        return (
            <div className="chat message sticky mx-auto pt-3 pb-3">
                <p>{message}</p>
            </div>
        )
    }
}

export default MessageBox;