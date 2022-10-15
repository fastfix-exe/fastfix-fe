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
import Emergency from "./Pages/Emergency/Emergency";
import News from "./Pages/News/News";
import StorePersonalProfile from "./Pages/Profile/StorePersonalProfile";
import jwt_decode from "jwt-decode";
import StoreDashboard from "./Pages/Dashboard/StoreDashboard";
import StoreEmergency from "./Pages/Emergency/StoreEmergency";

import { io } from "socket.io-client";
import EmployeeEmergency from "./Pages/Emergency/EmployeeEmergency";

const socket = io("https://fastfix-core-service.herokuapp.com");

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
      var decoded = jwt_decode(JSON.parse(user).tokens.accessToken);
      var expiredDate = new Date(decoded.exp * 1000);
      var toDay = new Date();
      if (toDay >= expiredDate) {
        dispatch(userAction.logout());
      }
      dispatch(userAction.login(JSON.parse(user)));
    } else {
      navigate("/login");
    }
  }, [user, dispatch, navigate]);

  return (
    <div className="w-screen h-screen flex place-content-evenly items-center p-2 bg-screen-bg bg-cover bg-center bg-no-repeat lg:p-0">
      <div className="relative p-2 aspect-[9/16] h-full border-slate-600 border-2 bg-white rounded-md overflow-hidden">
        <div className="pt-8 lg:pt-0 overflow-x-hidden overflow-y-auto scrollbar-hide h-full">
          <Routes>
            {user ? (
              <>
                {JSON.parse(user).loginUser ? (
                  <>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route
                      path="/login"
                      element={<Navigate to="/dashboard" />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/search" element={<SearchStore />} />
                    <Route
                      path="/emergency"
                      element={<Emergency socket={socket} />}
                    />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/store" element={<StoreProfile />}>
                      <Route path=":id" element={<StoreProfile />} />
                    </Route>
                  </>
                ) : (
                  <>
                    {JSON.parse(user).loginStore.employeeName ? (
                      <>
                        <Route
                          path="/"
                          element={<Navigate to="/emergency" />}
                        />
                        <Route
                          path="/login"
                          element={<Navigate to="/emergency" />}
                        />
                        <Route
                          path="/emergency"
                          element={<EmployeeEmergency socket={socket} />}
                        />
                        <Route
                          path="/profile"
                          element={<StorePersonalProfile />}
                        />
                      </>
                    ) : (
                      <>
                        <Route
                          path="/"
                          element={<Navigate to="/dashboard" />}
                        />
                        <Route
                          path="/login"
                          element={<Navigate to="/dashboard" />}
                        />
                        <Route path="/dashboard" element={<StoreDashboard />} />
                        <Route path="/search" element={<SearchStore />} />
                        <Route path="/emergency" element={<StoreEmergency />} />
                        <Route
                          path="/profile"
                          element={<StorePersonalProfile />}
                        />
                        <Route path="/news" element={<News />} />
                        <Route path="/store" element={<StoreProfile />}>
                          <Route path=":id" element={<StoreProfile />} />
                        </Route>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Login />} />
              </>
            )}
          </Routes>
        </div>

        <div className="flex items-center w-full absolute left-1/2 top-0 -translate-x-1/2 lg:hidden bg-white">
          <div className="w-1/5 text-center">{time}</div>
          <div className="h-8 bg-black rounded-b-xl w-3/5 z-50"></div>
          <div className="flex justify-evenly w-1/5">
            <AiFillSignal />
            <BsWifi />
            <BsBatteryFull />
          </div>
        </div>

        <div
          className={
            window.location.pathname.includes("/login") ? "hidden" : ""
          }
        >
          <Navbar />
        </div>

        <div className="left-1/2 bottom-1 -translate-x-1/2 absolute lg:hidden cursor-pointer">
          <div
            className="w-40 h-1 bg-black rounded-lg"
            onClick={() => navigate(-1)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;
