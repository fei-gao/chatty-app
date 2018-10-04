import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
  super(props);
  this.state =  {
    currentUser: {
      name: 'Anonymous',
      color: '#FFFFFF'
    }, 
    connection: 0,
    messages: [
      { type: 'incomingMessage',
        id: 1,
        username: 'Bob',
        content: 'Has anyone seen my marbles?',
        color: '#FF0000'
      },
      { type: 'incomingMessage',
        id: 2,
        username: 'Anonymous',
        content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
        color: '#0000FF'
      }
    ]
  }
  this.socket;
  this.changeUsername = this.changeUsername.bind(this);
  this.addMessage = this.addMessage.bind(this);
  }
  
  addMessage(username, content, color){
    let newMessage = {
      type: 'postMessage',
      username: username,
      content: content,
      color: color
    }
    this.socket.send(JSON.stringify(newMessage));
  }
  
  changeUsername(username, color){
    this.setState({
        currentUser: {
          name: username,
          color: color
        }
    })
    let notification = {
      type: 'postNotification',
      content:`${this.state.currentUser.name} has changed their name to ${username}`
    }
    this.socket.send(JSON.stringify(notification));
  }
  // in App.jsx
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = (event) => {
      console.log('connected to the server');
    };
    
    this.socket.onmessage = (event) => {
      let parsed = JSON.parse(event.data); //event.data is stringified obj
      // console.log("parsed---------", parsed.type);
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
        break;

        case 'assignColor':
        this.setState({
          currentUser: {
            name: this.state.currentUser.name,
            color: parsed.color
          }
        })
        break; 

        default:
         // show an error in the console if the message type is unknown
         throw new Error("Unknown event type " + parsed.type);
        }
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
