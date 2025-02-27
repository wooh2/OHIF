import React from 'react';
import { useRef, useEffect } from "react";

const MessageBox = ({message}) => {
    const textArea = useRef();

    useEffect(() => {
        const area = textArea.current;
        if (area !== undefined) {
            area.scrollTop = area.scrollHeight;
            console.log(area.scrollHeight);
        }
    });

    return (
        <div className="chat message sticky mx-auto pt-3 pb-3" ref={textArea}>
            <p>{message}</p>
        </div>
    )
}

export default MessageBox;