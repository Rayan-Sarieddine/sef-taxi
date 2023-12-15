import Navbar from "../../components/common/Navbar";
import { Sidebar } from "../../components/common/Sidebar";
import Chat from "../../components/chat/";
import { useDispatch, useSelector } from "react-redux";
import { extractUserSlice, setUser } from "../../core/redux/user/userSlice";
import { BackButton } from "../../components/common/BackButton";
// css imports
import "./style.css";
const ChatRoom = () => {
  const dispatch = useDispatch();
  const userState = useSelector(extractUserSlice);

  return (
    <div className="content-container chat-room">
      <BackButton />
      <main>
        <Chat userId={userState.id} />
      </main>
    </div>
  );
};
export default ChatRoom;
