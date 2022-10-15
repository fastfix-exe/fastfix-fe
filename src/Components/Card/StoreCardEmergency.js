import { AiTwotoneStar, AiOutlineStar } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import { BsStarHalf } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";
import { useState } from "react";
import userApi from "../../API/Services/userApi";

const user = localStorage.getItem("USER");

const StoreCardRow = (props) => {
  const [openConfirmStore, setOpenConfirmStore] = useState(false);

  const customStar = {
    size: 17,
    isHalf: true,
    value: props.store.rating,
    edit: false,
    emptyIcon: <AiOutlineStar />,
    halfIcon: <BsStarHalf />,
    filledIcon: <AiTwotoneStar />,
  };

  const onCallStore = () => {
    window.open(`tel:+${props.store.phoneNumber}`, "", "width=400,height=400");

    setOpenConfirmStore(true);

    props.changeIsCalling(true);
  };

  const cancelEmergencyCalling = () => {
    props.changeIsCalling(false);
    setOpenConfirmStore(false);
  };

  const acceptEmergencyCalling = async () => {
    try {
      const currentUser = JSON.parse(user).loginUser;

      const responseComment = await userApi.sendEmergencyRequest({
        userId: currentUser.id,
        storeId: props.store.id,
        status: 0,
      });
      if (responseComment?.status === 200) {
        props.changeRequestStatus(0);
      } else {
        console.log("No comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-md hover:shadow-lg">
      <div
        className="flex gap-x-4 my-4 cursor-pointer p-4"
        onClick={props.onClick}
      >
        <div className="w-1/4">
          <img src={props.store.avatarPicture} alt="" />
        </div>
        <div className="w-3/4">
          <div className="flex justify-between">
            <div className="w-3/4">{props.store.storeName.toUpperCase()}</div>
            <div className="flex items-center text-gray-500	w-1/4">
              <div className="mr-1">
                <MdLocationOn className="text-sm" />
              </div>
              <div className="text-sm">
                {Math.round(props.store.distance)} Km
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3/4">
              <div className="flex items-center">
                <div className="mr-1 underline">{props.store.rating}</div>
                <ReactStars {...customStar} />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xl text-gray-500">
                  {props.store.emergency.type === "bike" ? (
                    <div>
                      <RiMotorbikeFill />
                    </div>
                  ) : (
                    <div>
                      <FaCarSide />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-1/4">
              {!props.isCalling && (
                <button
                  onClick={onCallStore}
                  className="rounded-md bg-orange text-white p-1 hover:shadow-md"
                >
                  Call now
                </button>
              )}
              {props.isCalling && (
                <button className="rounded-md bg-stone-300 text-white p-1 cursor-not-allowed	">
                  Call now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {openConfirmStore && (
        <div className="flex justify-evenly pb-4">
          <button
            onClick={acceptEmergencyCalling}
            className="rounded-md bg-green-500 text-white p-2 hover:shadow-md"
          >
            Apply
          </button>
          <button
            onClick={cancelEmergencyCalling}
            className="rounded-md bg-red-600 text-white p-2 hover:shadow-md"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default StoreCardRow;
