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
  this.socket;
  this.addMessage = this.addMessage.bind(this);
  }
  
  addMessage(username, content){
    const randomId = Math.random().toString(36).substr(2, 5);
    console.log("add new message");
    let newMessage = {
      id: randomId,
      username: username,
      content: content
    }
    this.setState({
      messages: [...this.state.messages, newMessage]
    })
    this.socket.send(JSON.stringify(newMessage));
  }

  // in App.jsx
componentDidMount() {
  this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = (event) => {
      console.log('connected to the server');
      this.socket.send("Here's some text that the server is urgently awaiting!");
    };

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
