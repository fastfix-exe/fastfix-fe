// import mechanic_1 from "./Pictures/mechanic_1.png";
// import mechanic_2 from "./Pictures/mechanic_2.png";
import Login from "./Pages/Auth/Login";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { BsWifi, BsBatteryFull } from "react-icons/bs";
import { AiFillSignal } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "./Store/Slice/userSlice";
import Navbar from "./Components/Navigator/Navbar";
import UserProfile from "./Pages/Profile/UserProfile";
import SearchStore from "./Pages/Search/SearchStore";
import StoreProfile from "./Pages/Profile/StoreProfile";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("USER");
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const today = new Date();
      setTime(
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      );
    }, 1000);
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(userAction.login(JSON.parse(user)));
    } else {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="w-screen h-screen flex place-content-evenly items-center p-2 bg-screen-bg bg-cover bg-center bg-no-repeat lg:p-0">
      {/* <div className="w-96 h-96 flex justify-center lg:hidden">
        <img src={mechanic_2} alt="mechanic_1" />
      </div> */}
      <div className="relative p-2 aspect-[9/16] h-full border-slate-600 border-2 bg-white rounded-md overflow-hidden">
        <div className="flex items-center w-full absolute left-1/2 top-0 -translate-x-1/2 lg:hidden bg-white">
          <div className="w-1/5 text-center">{time}</div>
          <div className="h-8 bg-black rounded-b-xl w-3/5"></div>
          <div className="flex justify-evenly w-1/5">
            <AiFillSignal />
            <BsWifi />
            <BsBatteryFull />
          </div>
        </div>
        
        <div className="pt-8 lg:pt-0 overflow-x-hidden overflow-y-auto scrollbar-hide h-full">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<SearchStore />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/store" element={<StoreProfile />}>
              <Route path=":id" element={<StoreProfile />} />
            </Route>
          </Routes>
        </div>

        <div className={window.location.pathname.includes("/login") ? "hidden": ""}>
          <Navbar />
        </div>

        <div className="left-1/2 bottom-1 -translate-x-1/2 absolute lg:hidden cursor-pointer">
          <div
            className="w-40 h-1 bg-black rounded-lg"
            onClick={() => navigate(-1)}
          ></div>
        </div>
      </div>
      {/* <div className="w-96 h-96 lg:hidden flex justify-center">
        <img src={mechanic_1} alt="mechanic_1" />
      </div> */}
    </div>
  );
};

export default App;
