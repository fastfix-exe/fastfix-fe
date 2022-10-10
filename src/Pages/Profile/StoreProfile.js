import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userApi from "../../API/Services/userApi";
import { BsStarHalf } from "react-icons/bs";
import {
  AiFillPhone,
  AiFillMail,
  AiTwotoneStar,
  AiOutlineStar,
} from "react-icons/ai";
import { FaWrench } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { MdLocationOn } from "react-icons/md";
import UserMap from "../../Components/UserMap/UserMap";

const StoreProfile = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState();
  const [rating, setRating] = useState();
  let params = useParams();

  const [openMap, setOpenMap] = useState(false);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);

  const customStar = {
    size: 30,
    isHalf: true,
    edit: false,
    emptyIcon: <AiOutlineStar />,
    halfIcon: <BsStarHalf />,
    filledIcon: <AiTwotoneStar />,
  };

  useEffect(() => {
    const checkData = async () => {
      if (!params) {
        navigate("/dashboard");
      } else {
        try {
          const response = await userApi.getStoreById(params.id);
          if (response?.status === 200) {
            const cord = response.data.coordinates.split(", ");
            setLng(cord[1]);
            setLat(cord[0]);
            setRating({ ...customStar, value: response.data.rating });
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
      {!openMap && (
        <>
          <div className="bg-orange h-48 w-full pt-8">
            <h1 className="text-center text-white text-4xl">Profile</h1>
          </div>
          {store && (
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
                  <div className="flex justify-center">
                    <ReactStars {...rating} />
                  </div>
                </div>
                <div className="mt-8">
                  <div className="text-2xl font-medium">Information</div>
                  <hr />
                  <div
                    className="flex items-center text-xl py-4 cursor-pointer hover:shadow-md"
                    onClick={() =>
                      window.open(
                        `tel:+${store.phoneNumber}`,
                        "",
                        "width=400,height=400"
                      )
                    }
                  >
                    <div className="rounded-full p-1 bg-orange text-white mr-3">
                      <AiFillPhone className="text-xl" />
                    </div>
                    {store.phoneNumber}
                  </div>
                  <hr />
                  <div className="flex items-center text-xl py-4">
                    <div className="rounded-full p-1 bg-orange text-white mr-3">
                      <AiFillMail className="text-xl" />
                    </div>
                    {store.email}
                  </div>
                  <hr />
                  <div className="flex items-center text-xl py-4">
                    <div className="rounded-full p-1 bg-orange text-white mr-3">
                      <FaWrench className="text-xl" />
                    </div>
                    {store.emergency.type}
                  </div>
                  <hr />
                  <div
                    className="flex items-center text-xl py-4 cursor-pointer hover:shadow-md"
                    onClick={() => setOpenMap(true)}
                  >
                    <div className="rounded-full p-1 bg-orange text-white mr-3">
                      <MdLocationOn className="text-xl" />
                    </div>
                    <div className="underline">See store on map</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {openMap && (
        <div>
          <UserMap lat={lat} lng={lng} />
        </div>
      )}
    </div>
  );
};

export default StoreProfile;
