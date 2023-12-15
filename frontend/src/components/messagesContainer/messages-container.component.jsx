import { useEffect, useState } from "react";
import { getMessages } from "../../core/axios"
import { extractMessagesSlice, setMessages } from "../../core/redux/messages/messagesSlice"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from 'react-router-dom';
import './style.css'
import Message from "../message/message.component"
const MessagesContainer = ({ userId, receiverId }) => {
  let dispatch = useDispatch()
  const { allMessages } = useSelector(extractMessagesSlice)
  let timeout = 0, interval = 0
  useEffect(() => {
    async function fetchMessages() {
      try {
        const headers = { Authorization: localStorage.getItem('token') }
        const data = await getMessages('getUsersMessages', 'POST', { receiverId: +receiverId }, headers);
        if (data['sorted messages'].length > 0)
          dispatch(setMessages({ allMessages: data['sorted messages'] }))
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessages()
    clearInterval(interval)
    interval = setInterval(() => {
      fetchMessages()
    }, 3000)
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="messages-container">
      {
        allMessages.map(message => {
          return <Message key={message.id} userId={userId} message={message} />
        })
      }
    </div>
  )
}
export default MessagesContainer