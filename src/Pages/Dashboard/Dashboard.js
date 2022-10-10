import UserCard from "../../Components/Card/UserCard";
import { useSelector } from "react-redux";
import TextInput from "../../Components/Input/TextInput";
import { useEffect, useState } from "react";
import userApi from "../../API/Services/userApi";
import StoreCard from "../../Components/Card/StoreCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [search, setSearch] = useState("");
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  const getSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getStores({
        longtitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });

    const getStores = async (position) => {
      try {
        const response = await userApi.getStores(position);
        if (response?.status === 200) {
          setStores(response.data);
        } else {
          console.log("No store");
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <div className="">
      <div className="overflow-hidden w-full my-4">
        <TextInput placeholder="Search" value={search} onChange={getSearch} />
      </div>
      <hr className="mb-1" />
      {user && (
        <div className="mb-4">
          {user.loginUser ? <UserCard user={user.loginUser} /> : <UserCard user={user.loginStore} /> }
          
        </div>
      )}
      <div>
        <h1 className="py-2">Stores near you</h1>
        <div className="grid grid-cols-3 gap-4 mb-20">
          {stores &&
            stores.length > 0 &&
            stores.map((store) => {
              return <StoreCard key={store.id} store={store} onClick={() => navigate(`/store/${store.id}`)}/>;
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
