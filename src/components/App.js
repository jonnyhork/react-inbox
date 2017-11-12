import React, { Component } from 'react'
import '../App.css'
import Toolbar from '../components/Toolbar'
import MessageList from '../components/MessageList'
import ComposeMessage from '../components/ComposeMessage'

const API = process.env.REACT_APP_API_URL

class App extends Component {

    state = {
      messages: []
    }


    async componentDidMount() {
      const messages = await this.getMessages()
      console.log('MESSAGES CDM:', messages)
      this.setState({
        messages
      })
    }

    async getMessages() {
        const response = await fetch(`${API}/api/messages/`)
        const json = await response.json()
        return json._embedded.messages
      }

      // for the other patch routes need to send an object payload that has { messagesIds: '[1,2]', command: 'read', read: true } kind of thing but in the JSON.stringify() it expects an array of message ids a command and maybe a new state value like read:true

    async request(method = 'GET', body = null) { // this could take a path agrument?
      if(body) body=JSON.stringify(body)
      return await fetch(`http://localhost:8082/api/messages/`, {
        method,
        headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
        body
      })
    }

    async updateMessages(payload) {
      await this.request('PATCH', payload)
    }

    toggleCompose() {
      this.setState({compose: !this.state.compose})
    }

    async sendMessage(message) {
      const response =  await this.request('POST',{
        subject: message.subject,
        body: message.body
      })

      const newMessage = await response.json()
      const messages = [...this.state.messages, newMessage]

      this.setState({
        messages,
        compose: false,
      })
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

    selectAll() {
      console.log("selectAll was clicked")
      const selectedMessages = this.state.messages.filter(message => message.selected)// the number of selected messages
      const selected = selectedMessages.length !== this.state.messages.length
      console.log("selected is", selected) // if the number selected is equal to the total number of messages then that means that all the messages are selected and you want to set the value of selected to false. If they are not equal
      this.setState({
        messages: this.state.messages.map(message => (
          message.selected !== selected ? { ...message, selected } : message
        ))
      })
    }

   async toggleSelect(message) {
    this.toggleProperty(message, 'selected')
  }

  async toggleStarred(message) {
    await this.updateMessages({  // This updates the API
      "messageIds":[message.id],
      "command": "star",
      "star": !message.starred
    })
    this.toggleProperty(message, 'starred')  // This upodates the local state
  }

  async markAsRead() {

    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "read",
      "read": true
    })
    console.log('markAsRead clicked')
    this.setState({
      messages: this.state.messages.map( (message) => (
        message.selected ? {...message, read:true} : message
      ))
    })
  }

  async markAsUnread() {

    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "read",
      "read": false
    })
    this.setState({
      messages: this.state.messages.map( (message) => (
        message.selected ? {...message, read:false} : message
      ))
    })
  }

  async applyLabel(label) {

    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "addLabel",
      label
    })

    console.log("apply label")
    const messages = this.state.messages.map( (message) => (
      message.selected && !message.labels.includes(label) ? {...message, labels:[...message.labels, label].sort()} : message
    ))
    this.setState({ messages })
  }

  async removeLabel(label) {

    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "removeLabel",
      label
    })

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

  async deleteMessage(message) {
    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "delete"
    })
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
        toggleCompose={this.toggleCompose.bind(this)}
        />

      {
        this.state.compose ?
        <ComposeMessage sendMessage={this.sendMessage.bind(this)}/> : null
      }

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
