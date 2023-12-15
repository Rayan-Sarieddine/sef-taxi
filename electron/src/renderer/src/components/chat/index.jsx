import { useDispatch, useSelector } from "react-redux"
import { extractUserSlice, setUser } from "../../core/redux/user/userSlice"
import Input from '../input'
import MessagesContainer from '../messagesContainer/messages-container.component'

import './style.css'
const Chat = () => {
  const dispatch = useDispatch()
  const userState = useSelector(extractUserSlice)

  return (
    <div className="chat">
      <header>
        <div className="logo"></div>
        <div className="name">Nadim Rifaii</div>
      </header>
      <div className="holder">
        <MessagesContainer userId={userState.id} />
      </div>
      <div className="input-container">
        <Input userId={userState.id} />
      </div>
    </div>
  )
}
export default Chat