import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import userApi from "../../API/Services/userApi";
import SubCard from "../../Components/Card/SubCard";
import UserCard from "../../Components/Card/UserCard";

const StoreDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [subs, setSubs] = useState([]);
  const [selectedSub, setSelectedSub] = useState(0);

  useEffect(() => {
    const getSubList = async () => {
      const response = await userApi.getSubs();
      if (response?.status === 200) {
        setSubs(response.data);
      } else {
        console.log("No subs");
      }
      try {
      } catch (error) {
        console.log(error);
      }
    };

    getSubList();
  }, []);

  return (
    <div>
      <div className="py-4">
        {user && (
          <div>
            <UserCard user={user.loginStore} />
          </div>
        )}
      </div>
      <hr />
      <div>
        <div>
          <div className="py-4 text-center">
            <h1>PLANS</h1>
          </div>
          <div>
            <div className="flex justify-evenly">
              <div
                className={`cursor-pointer ${
                  selectedSub === 0 ? "font-bold text-black" : "text-gray-400"
                }`}
                onClick={() => setSelectedSub(0)}
              >
                Free
              </div>
              <div
                className={`cursor-pointer ${
                  selectedSub === 1 ? "font-bold text-black" : "text-gray-400"
                }`}
                onClick={() => setSelectedSub(1)}
              >
                Standard
              </div>
              <div
                className={`cursor-pointer ${
                  selectedSub === 2 ? "font-bold text-black" : "text-gray-400"
                }`}
                onClick={() => setSelectedSub(2)}
              >
                Professional
              </div>
              <div
                className={`cursor-pointer ${
                  selectedSub === 3 ? "font-bold text-black" : "text-gray-400"
                }`}
                onClick={() => setSelectedSub(3)}
              >
                Premium
              </div>
            </div>
            <hr />
            <div className="mt-4">
              {selectedSub === 0 && (
                <div>
                  <SubCard sub={subs[0]} customColor="bg-gradient-to-r from-cyan-500 to-blue-500"/>
                </div>
              )}
              {selectedSub === 1 && (
                <div>
                  <SubCard sub={subs[1]} customColor="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"/>
                </div>
              )}
              {selectedSub === 2 && (
                <div>
                  <SubCard sub={subs[2]} customColor="bg-gradient-to-r from-amber-400 to-amber-600"/>
                </div>
              )}
              {selectedSub === 3 && (
                <div>
                  <SubCard sub={subs[3]} customColor="bg-gradient-to-r from-red-700 to-red-400"/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
