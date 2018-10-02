import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props)
        this.handleMessageSubmission = this.handleMessageSubmission.bind(this);
    }

    handleMessageSubmission (event){
        if(event.key === 'Enter'){
            let username = this.props.currentUser.name;
            let content = event.target;
            console.log('------',event.target);
            this.props.addMessage(username, content.value);
            content.value = '';
        }
    }
    
  render() {
    return (
        <footer className="chatbar">
            <input name="username" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue ={this.props.currentUser.name} />
            <input onKeyPress={this.handleMessageSubmission} name="content" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
    )
}
}

export default ChatBar;