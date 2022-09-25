import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import {HiSpeakerphone} from "react-icons/hi";
import {GiEarthAfricaEurope} from "react-icons/gi";
import {FaUserAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full absolute bottom-0 left-0 h-20 bg-white border-t-2">
      <div className="flex justify-evenly h-full w-full items-center">
        <div
          onClick={() => navigate("/dashboard")}
          className={`rounded-full cursor-pointer p-4 shadow-md hover:shadow-lg ${
            window.location.pathname.includes("/dashboard")
              ? "bg-orange text-white"
              : ""
          }`}
        >
          <AiFillHome />
        </div>
        <div
          onClick={() => navigate("/search")}
          className={`rounded-full cursor-pointer p-4 shadow-md hover:shadow-lg ${
            window.location.pathname.includes("/search")
              ? "bg-orange text-white"
              : ""
          }`}
        >
          <AiOutlineSearch />
        </div>
        <div
          onClick={() => navigate("/emergency")}
          className={`rounded-full cursor-pointer p-4 shadow-md hover:shadow-lg ${
            window.location.pathname.includes("/emergency")
              ? "bg-orange text-white"
              : ""
          }`}
        >
          <HiSpeakerphone />
        </div>
        <div
          onClick={() => navigate("/news")}
          className={`rounded-full cursor-pointer p-4 shadow-md hover:shadow-lg ${
            window.location.pathname.includes("/news")
              ? "bg-orange text-white"
              : ""
          }`}
        >
          <GiEarthAfricaEurope />
        </div>
        <div
          onClick={() => navigate("/profile")}
          className={`rounded-full cursor-pointer p-4 shadow-md hover:shadow-lg ${
            window.location.pathname.includes("/profile")
              ? "bg-orange text-white"
              : ""
          }`}
        >
          <FaUserAlt />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
