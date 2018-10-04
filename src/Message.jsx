import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        {(this.props.message.type == 'incomingMessage') ?
        (<div style={{color:this.props.message.color}} className='message'>
            <span className="message-username" > {this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
            </div>) :
            (<div className="notification">
            <span className="notification-content"> {this.props.message.content} </span>
          </div>)}
      </div>
    );
  }
}
export default Message;
