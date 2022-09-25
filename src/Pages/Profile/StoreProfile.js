import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userApi from "../../API/Services/userApi";
import { AiFillPhone, AiFillMail } from "react-icons/ai";

const StoreProfile = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState();
  let params = useParams();

  useEffect(() => {
    const checkData = async () => {
      if (!params) {
        navigate("/dashboard");
      } else {
        try {
          const response = await userApi.getStoreById(params.id);
          if (response?.status === 200) {
            console.log(response.data);
            setStore(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    checkData();
  }, []);

  return (
    <div>
      <div className="bg-orange h-48 w-full pt-8">
        <h1 className="text-center text-white text-4xl">Profile</h1>
      </div>
      <div>
        <div className="-translate-y-20">
          <div className=" w-full overflow-hidden flex justify-center">
            <img
              src={store.avatarPicture}
              alt="a"
              className="w-48 bg-white rounded-full"
            />
          </div>
          <div>
            <div className="text-center text-3xl font-bold">
              {store.storeName.toUpperCase()}
            </div>
          </div>
          <div className="mt-8">
            <div className="text-2xl font-medium">Information</div>
            <hr />
            <div className="flex items-center text-xl my-4">
              <AiFillPhone className="mr-1 text-xl" />
              {store.phoneNumber}
            </div>
            <hr />
            <div className="flex items-center text-xl my-4">
              <AiFillMail className="mr-1 text-xl" />
              {store.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;
