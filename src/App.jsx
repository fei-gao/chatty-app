import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
  super(props);
  this.state =  {
    currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
      { id: 1,
        username: 'Bob',
        content: 'Has anyone seen my marbles?',
      },
      { id: 2,
        username: 'Anonymous',
        content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
      }
    ]
  }
  this.addMessage = this.addMessage.bind(this);
  }
  
  addMessage(username, content){
    let msgLen = this.state.messages.length;
    console.log("add new message");
    let newMessage = {
      id: this.state.messages[msgLen-1].id +3,
      username: username,
      content: content
    }
    this.setState({
      messages: [...this.state.messages, newMessage]
    })
  }



  // in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
