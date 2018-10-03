import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
  super(props);
  this.state =  {
    currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
    connection: 0,
    messages: [
      { type: 'incomingMessage',
        id: 1,
        username: 'Bob',
        content: 'Has anyone seen my marbles?',
      },
      { type: 'incomingMessage',
        id: 2,
        username: 'Anonymous',
        content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
      }
    ]
  }
  this.socket;
  this.changeUsername = this.changeUsername.bind(this);
  this.addMessage = this.addMessage.bind(this);
  }
  
  addMessage(username, content){
    console.log("add new message");
    let newMessage = {
      type: 'postMessage',
      username: username,
      content: content
    }
    this.socket.send(JSON.stringify(newMessage));
  }
  
  changeUsername(username){
    this.setState({
        currentUser: {name: username}
    })
    let notification = {
      type: 'postNotification',
      content:`${this.state.currentUser.name} has changed their name to ${username}`
    }
    this.socket.send(JSON.stringify(notification));
  }
  // in App.jsx
  componentDidMount() {
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001/");
    
    this.socket.onopen = (event) => {
      console.log('connected to the server');
      // this.socket.send("Here's some text that the server is urgently awaiting!");
    };
    
    this.socket.onmessage = (event) => {
      console.log(event);
      let parsed = JSON.parse(event.data); //event.data is stringified obj
      console.log("parsed---------", parsed.type);
      switch(parsed.type){
        case 'incomingMessage':
        this.setState({
          messages: [...this.state.messages, parsed]
        })
        break;

        case 'incomingNotification':
        this.setState({
          messages: [...this.state.messages, parsed]
        })
        break;
        
        case 'connect':
        this.setState({
          connection: parsed.num
        })
        default:
         // show an error in the console if the message type is unknown
         throw new Error("Unknown event type " + data.type);
        }
        
        console.log("----", event, event.data);
        console.log(this.state);
      }
  }



  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty
          </a>
          <span className="connection-num">{this.state.connection} users online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} changeUsername={this.changeUsername}/>
      </div>
    );
  }
}
export default App;
