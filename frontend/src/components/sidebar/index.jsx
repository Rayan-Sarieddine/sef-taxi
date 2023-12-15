import './style.css'
import { useSelector } from 'react-redux'
import { extractReceiverSlice } from '../../core/redux/receiver/receiverSlice'
const SideBar = () => {
  const receiver = useSelector(extractReceiverSlice)
  return (
    <div className="side-bar">
      <div className="profile">
        <img src={`${receiver.img_url}`} alt="" />
      </div>
      <div className="info">
        <div className="row">
          <div className="left">Name</div>
          <div className="right">{receiver.name}</div>
        </div>
        <div className="row">
          <div className="left">Email</div>
          <div className="right">{receiver.email}</div>
        </div>
      </div>
    </div>
  )
}
export default SideBar