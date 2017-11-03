import React from 'react'
// need to change the classes of the message based on the state
const Message = ( {message, toggleSelect} ) => {

  const selectedClass = message.selected ? 'selected' : ""






  return (

  <div className={`row message unread ${selectedClass}`} onClick={() => toggleSelect(message)} >
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox" checked={!!message.selected} readOnly= {true}/>
        </div>
        <div className="col-xs-2">
          <i className="star fa fa-star-o"></i>
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
