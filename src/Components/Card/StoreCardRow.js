import { AiFillPhone, AiTwotoneStar, AiOutlineStar } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import { BsStarHalf } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

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
      className="flex gap-x-4 my-4 shadow-md cursor-pointer hover:shadow-lg"
      onClick={props.onClick}
    >
      <div className="w-1/4">
        <img src={props.store.avatarPicture} alt="" />
      </div>
      <div>
        <div>{props.store.storeName.toUpperCase()}</div>
        <div className="flex items-center">
          <div className="mr-1 underline">{props.store.rating}</div>
          <ReactStars {...customStar} />
        </div>
        <div className="flex items-center">
          <AiFillPhone className="mr-1 text-sm" />
          {props.store.phoneNumber}
        </div>
        <div className="flex items-center text-gray-500	">
          <div className="mr-1">
            <MdLocationOn className="text-sm" />
          </div>
          <div className="text-sm">{Math.round(props.store.distance)} Km</div>
        </div>
      </div>
    </div>
  );
};

export default StoreCardRow;
