import { AiFillPhone, AiTwotoneStar, AiOutlineStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { BsStarHalf } from "react-icons/bs";

const StoreCard = (props) => {
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
      className="leading-8 cursor-pointer shadow-md hover:shadow-lg p-1 rounded-md"
      onClick={props.onClick}
    >
      <div>
        <img src={props.store.avatarPicture} alt="img" />
      </div>
      <div className="flex items-center">
        <p className="truncate text-sm">
          {props.store.storeName.toUpperCase()}
        </p>
      </div>
      <div className="flex items-center">
        <div className="mr-1 underline">{props.store.rating}</div>
        <ReactStars {...customStar} />
      </div>
      <div className="flex items-center">
        <div className="mr-1">
          <AiFillPhone className="text-sm" />
        </div>
        <p className="truncate">{props.store.phoneNumber}</p>
      </div>
      <div className="flex items-center text-gray-500	">
        <div className="mr-1">
          <MdLocationOn className="text-sm" />
        </div>
        <div className="text-sm">{Math.round(props.store.distance)} Km</div>
      </div>
    </div>
  );
};

export default StoreCard;
