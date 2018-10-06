import React, {Component} from 'react';
import Message from './Message.jsx';

// Container component
// class MessageList extends Component {
//   render() {
//     const messages = this.props.messages.map(message => 
//       <Message key={message.id} message={message}/>
//     )
//     return (
//         <div className="messages">
//         {messages}
//         </div>
//     )
//   }
// }

// UI Component
const MessageList = ({messages}) => {
  const allMessages = messages.map(message => {
    return (
    <Message key = {message.id} message={message} /> 
    )
  })
  
  return(
    <div className="messages">
    {allMessages}
    </div>
  )
}
export default MessageList;