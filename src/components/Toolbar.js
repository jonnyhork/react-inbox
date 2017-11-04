import React from 'react'

const Toolbar = ( {
  messages,
  markAsRead,
  markAsUnread,
  applyLabel,
  removeLabel
}) => {

  const numberSelected = messages.filter( (message) => message.selected == true).length
  console.log("numberSelected", numberSelected)
  let selectAllProp

  switch (numberSelected) {
    case 0:
        selectAllProp = 'fa-square-o'
      break;
    case messages.length:
        selectAllProp = 'fa-check-square-o'
      break;
    default:
        selectAllProp = 'fa-minus-square-o'
  }

  return (

  <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">2</span>
        unread messages
      </p>

      <a className="btn btn-danger">
        <i className="fa fa-plus"></i>
      </a>

      <button className="btn btn-default">
        <i className={`fa ${selectAllProp}`}></i>
      </button>

      <button className="btn btn-default" onClick={markAsRead}>Mark As Read</button>

      <button className="btn btn-default" onClick={markAsUnread}>Mark As Unread</button>

      <select className="form-control label-select" onChange={(e) => {applyLabel(e.target.value); e.target.selectedIndex = 0}}>
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select className="form-control label-select" onChange={(e)=>{removeLabel(e.target.value); e.target.selectedIndex = 0}}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <button className="btn btn-default">
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  </div>

)}



export default Toolbar
