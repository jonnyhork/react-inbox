import React, { Component } from 'react'
// import logo from '../logo.svg'
import '../App.css'
import Toolbar from '../components/Toolbar'
import MessageList from '../components/MessageList'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages
    }
    console.log('The current state of the props.messages:', this.state)
  }

  toggleProperty(message, property) {
    // console.log("data type of message is:", typeof message)
    // console.log("message is:", message)
    const idx = this.state.messages.indexOf(message)
    // console.log(`idx is ${idx}`)
    this.setState({
      messages: [
        ...this.state.messages.slice(0,idx),
        {...message, [property]: !message[property] },
        ...this.state.messages.slice(idx + 1)
      ]
    })
    // console.log(`idx is ${idx}`)
    // console.log("#####This is the slice up to the message:",...this.state.messages.slice(0,idx))
    // console.log("sliced",{
    //   messages: [
    //     ...this.state.messages.slice(0,idx),
    //     {...message, [property]: !message[property] },
    //     ...this.state.messages.slice(idx + 1)
    //   ]})

  }

  // selectAll() {
  //   console.log("selectAll was clicked")
  //   const selectedMessages = this.state.messages.filter(message => message.selected)// the number of selected messages
  //   const selected = selectedMessages.length !== this.state.messages.length
  //   console.log("selected is", selected) // if the number selected is equal to the total number of messages then that means that all the messages are selected and you want to set the value of selected to false. If they are not equal
  //   this.setState({
  //     messages: this.state.messages.map(message => (
  //       message.selected !== selected ? { ...message, selected } : message
  //     ))
  //   })
  // }
  selectAll(){
    const numSelected = this.state.messages.filter( message => message.selected === true).length
    console.log("numSelected is", numSelected)
    const selected = numSelected !== this.state.messages.length
    console.log("selected is", selected)

    this.setState({
      messages: this.state.messages.map( message => message.selected !== selected ? {...message, selected} : message)
    })

  }
  toggleSelect(message) {
    this.toggleProperty(message, 'selected')
  }

  toggleStarred(message) {
    this.toggleProperty(message, 'starred')
  }

  markAsRead() {
    console.log('markAsRead clicked')
    this.setState({
      messages: this.state.messages.map( (message) => (
        message.selected ? {...message, read:true} : message
      ))
    })
  }

  markAsUnread() {
    this.setState({
      messages: this.state.messages.map( (message) => (
        message.selected ? {...message, read:false} : message
      ))
    })
  }

  applyLabel(label) {
    console.log("apply label")
    const messages = this.state.messages.map( (message) => (
      message.selected && !message.labels.includes(label) ? {...message, labels:[...message.labels, label].sort()} : message
    ))
    this.setState({ messages })
  }

  removeLabel(label) {
    console.log("remove the label")
    const messages = this.state.messages.map( (message) => {
      const idx = message.labels.indexOf(label)
      if (message.selected && idx > -1) {
        return {...message, labels:[...message.labels.slice(0,idx),...message.labels.slice(idx + 1)]}
      }
      return message
    })
    this.setState({ messages })
  }

  deleteMessage(message) {
    // filter all the messages that are not selected then set state with the returned array
    let messages = this.state.messages.filter( message => message.selected !== true)
    this.setState({messages})
  }

  render() {
    return (
      <div className="container">
        <h1>React Inbox</h1>
        <Toolbar
        messages={this.state.messages}
        applyLabel={this.applyLabel.bind(this)}
        removeLabel={this.removeLabel.bind(this)}
        markAsRead={this.markAsRead.bind(this)}
        markAsUnread={this.markAsUnread.bind(this)}
        selectAll={this.selectAll.bind(this)}
        deleteMessage={this.deleteMessage.bind(this)}
        />
        <MessageList
        toggleStarred={this.toggleStarred.bind(this)}
        toggleSelect={this.toggleSelect.bind(this)}
        messages= {this.state.messages}
        />
      </div>
    )
  }
}

export default App
