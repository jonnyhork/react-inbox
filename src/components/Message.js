import React from 'react'
// need to change the classes of the message based on the state
const Message = ( {message, toggleSelect, toggleStarred} ) => {

  const selectedClass = message.selected ? 'selected' : ''
  const starClass = message.starred ? 'fa-star' : 'fa-star-o'
  const readClass = message.read ? 'read' : 'unread'

  const starMessage = (e) => {
    e.stopPropagation()
    console.log("star is clicked")
    toggleStarred(message)
  }



  return (

  <div className={`row message ${readClass} ${selectedClass}`} onClick={() => toggleSelect(message)} >
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox" checked={!!message.selected} readOnly= {true}/>
        </div>
        <div className="col-xs-2" onClick={starMessage}>
          <i className={`star fa ${starClass}`}></i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      <a href="#">
        {message.subject}
      </a>
    </div>
  </div>

)}




export default Message
