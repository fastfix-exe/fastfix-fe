import { AiFillPhone, AiFillMail } from "react-icons/ai";

const StoreCard = (props) => {
  return (
    <div className="leading-8 cursor-pointer shadow-md hover:shadow-lg p-1 rounded-md" onClick={props.onClick}>
      <div>
        <img src={props.store.avatarPicture} alt="img" />
      </div>
      <div className="text-ellipsis overflow-hidden text-xl">
        {props.store.storeName.toUpperCase()}
      </div>
      <div className="flex items-center">
        <AiFillPhone className="mr-1 text-sm" />
        <p className="text-ellipsis overflow-hidden">
          {props.store.phoneNumber}
        </p>
      </div>
      <div className="flex items-center">
        <AiFillMail className="mr-1 text-sm" />
        <p className="text-ellipsis overflow-hidden">{props.store.email}</p>
      </div>
    </div>
  );
};

export default StoreCard;
