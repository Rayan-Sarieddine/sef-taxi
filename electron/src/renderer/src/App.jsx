import "./styles/index.css";
import Login from "./pages/Login";
import { Route, Routes, useLocation } from "react-router";
import Navbar from "./components/common/Navbar";
import { Drivers } from "./pages/Drivers";
import { Sidebar } from "./components/common/Sidebar";
import { ViewDriver } from "./components/ViewDriver";
import ChatRoom from "./pages/ChatRoom/chatroom.component";
import { Passengers } from "./pages/Passengers";
import { ViewPassenger } from "./components/ViewPassenger";
function App() {
  const location = useLocation();
  return (
    <div className="page">
      <Navbar key={location.pathname == "/"} />
      <div className="flex row content">
        <Sidebar />
        <div className="main">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/viewdriver/:id" element={<ViewDriver />} />
            <Route path="/viewpassenger/:id" element={<ViewPassenger />} />
            <Route path="/passengers" element={<Passengers />} />
            <Route path="/chat/:id" element={<ChatRoom />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
