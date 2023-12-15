import { useEffect, useState } from "react";
import { postMessage, getMessages } from "../../core/axios";
import { extractMessagesSlice, setMessages } from "../../core/redux/messages/messagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import sendSVG from "../../assets/svg/sendLogo.svg";
import "./style.css";
const Input = ({ userId }) => {
  const { id } = useParams();
  let dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  function inputChange(e) {
    setInputValue(e.target.value);
  }
  async function createMessage() {
    try {
      console.log({ content: inputValue, receiverId: id, senderId: userId });
      const response = await postMessage(`createMessage`, "POST", { content: inputValue, receiverId: id, senderId: 1 });
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchMessages() {
    try {
      const headers = { Authorization: localStorage.getItem("token") };

      const data = await getMessages("getUsersMessages", "POST", { receiverId: 6 }, headers);
      dispatch(setMessages({ allMessages: data["sorted messages"] }));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <input type="text" onChange={inputChange} value={inputValue} placeholder="Enter you message" />
      <div className="logo-holder">
        <button
          onClick={async () => {
            await createMessage();
            await fetchMessages();
            setInputValue("");
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_116_90)">
              <path
                d="M29.1857 0.627394C29.7775 1.02703 30.088 1.71784 29.9767 2.40864L26.2267 26.1586C26.1388 26.7124 25.7931 27.1977 25.2892 27.4717C24.7853 27.7458 24.1818 27.78 23.6486 27.5631L16.6407 24.7257L12.6271 28.9561C12.1056 29.5099 11.2853 29.6926 10.5646 29.4186C9.84387 29.1445 9.37512 28.4651 9.37512 27.7115V22.9387C9.37512 22.7103 9.46301 22.4934 9.62122 22.3278L19.4415 11.8858C19.7814 11.5261 19.7697 10.9723 19.4181 10.6298C19.0665 10.2873 18.4982 10.2644 18.129 10.5898L6.21106 20.9062L1.03723 18.3828C0.416138 18.0802 0.0177001 17.4751 0.000122005 16.8014C-0.0174561 16.1277 0.345825 15.4997 0.943481 15.1629L27.1935 0.547467C27.8204 0.199209 28.5939 0.233464 29.1857 0.627394Z"
                fill="#777777"
              />
            </g>
            <defs>
              <clipPath id="clip0_116_90">
                <rect width="30" height="29.2308" fill="white" transform="translate(0 0.307678)" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </>
  );
};
export default Input;
