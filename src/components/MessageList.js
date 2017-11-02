import React from 'react'
import Message from './Message'


const MessageList = ( {messages} ) => (  //messages is an array or messages

  <div>
    {messages.map( message => <Message key={message.id} message={message} />)}
  </div>



)



export default MessageList
