import './message.style.css'
const Message = ({ userId, message }) => {
  return (
    <div className="message-holder">
      <div className={`message ${userId == message.sender_id ? 'right' : 'left'} `}>{message.content}</div>
    </div>
  )
}
export default Message