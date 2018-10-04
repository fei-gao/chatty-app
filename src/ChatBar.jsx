import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props)
        this.handleAddMessage = this.handleAddMessage.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
    }

    handleChangeUsername(event){
        if(event.key === 'Enter'){
            let username = event.target;
            let color = this.props.currentUser.color;
            this.props.changeUsername(username.value, color);
        }
    }

    handleAddMessage (event){
        if(event.key === 'Enter'){
            let username = this.props.currentUser.name;
            let content = event.target;
            let color = this.props.currentUser.color;
            this.props.addMessage(username, content.value, color);
            content.value = '';
        }
    }
    
  render() {
    return (
        <footer className="chatbar">
            <input onKeyPress={this.handleChangeUsername} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue = {this.props.currentUser.name} />
            <input onKeyPress={this.handleAddMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
    )
    }
}

export default ChatBar;