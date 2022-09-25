import { AiFillPhone, AiFillMail } from "react-icons/ai";

const StoreCardRow = (props) => {
  return (
    <div className="flex gap-x-4 my-4 shadow-md cursor-pointer hover:shadow-lg" onClick={props.onClick}>
      <div className="w-1/4">
        <img src={props.store.avatarPicture} alt="" />
      </div>
      <div className="">
        <div>{props.store.storeName.toUpperCase()}</div>
        <div className="flex items-center">
          <AiFillPhone className="mr-1 text-sm" />
          {props.store.phoneNumber}
        </div>
        <div className="flex items-center">
          <AiFillMail className="mr-1 text-sm" />
          {props.store.email}
        </div>
      </div>
    </div>
  );
};

export default StoreCardRow;
