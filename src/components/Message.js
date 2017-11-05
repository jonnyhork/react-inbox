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

  const labels = message.labels.map( (label, i) => (<span className="label label-warning" key={i}>{label}</span>) )
  // console.log("The labels are:", labels)

  return (

  <div className={`row message ${readClass} ${selectedClass}`}  >
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2" onClick={() => toggleSelect(message)}>
          <input type="checkbox" checked={!!message.selected} readOnly= {true}/>
        </div>
        <div className="col-xs-2" onClick={starMessage}>
          <i className={`star fa ${starClass}`}></i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      {labels}
      <a >
        {message.subject}
      </a>
    </div>
  </div>

)}


export default Message
