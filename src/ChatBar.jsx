import React from 'react';

// UI component netninja 15 - stateless components
const ChatBar = ({currentUser, addMessage, changeUsername}) => {
    const handleChangeUsername = (event) => {
        if(event.key === 'Enter'){
            let username = event.target.value;
            let color = currentUser.color;
            changeUsername(username, color);
        }
    }

    const handleAddMessage = (event) => {
        if(event.key === 'Enter'){
            let username = currentUser.name;
            let content = event.target;
            let color = currentUser.color;
            addMessage(username, content.value, color);
            content.value = '';
        }
    }

    return (
        <footer className="chatbar">
            <input onKeyPress={handleChangeUsername} className="chatbar-username" placeholder="Your Name, hit ENTER to change name" defaultValue = {currentUser.name} />
            <input onKeyPress={handleAddMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
    )
}

export default ChatBar;