import { AiTwotoneStar, AiOutlineStar } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import { BsStarHalf } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";

const StoreCardRow = (props) => {
  const customStar = {
    size: 17,
    isHalf: true,
    value: props.store.rating,
    edit: false,
    emptyIcon: <AiOutlineStar />,
    halfIcon: <BsStarHalf />,
    filledIcon: <AiTwotoneStar />,
  };

  return (
    <div
      className="flex gap-x-4 my-4 shadow-md cursor-pointer hover:shadow-lg p-4"
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
            <div className="text-sm">{Math.round(props.store.distance)} Km</div>
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
            <button
              onClick={() =>
                window.open(
                  `tel:+${props.store.phoneNumber}`,
                  "",
                  "width=400,height=400"
                )
              }
              className="rounded-md bg-orange text-white p-1 hover:shadow-md text-sm"
            >
              Call now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCardRow;
