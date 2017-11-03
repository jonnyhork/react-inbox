import React from 'react'
import Message from './Message'


const MessageList = ( {messages, toggleSelect} ) => (  //messages is an array of messages

  <div>
    {messages.map( message => (<Message
       key={message.id}
       message={message}
       toggleSelect={toggleSelect}
        />))}
  </div>



)



export default MessageList
