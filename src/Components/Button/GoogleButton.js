import { FcGoogle } from "react-icons/fc";

const GoogleButton = (props) => {
  return (
    <div
      className="cursor-pointer flex justify-center  items-center  border border-black group hover:bg-light-gray"
      onClick={props.onClick}
    >
      <FcGoogle className="text-2xl" />
      <button
        className="bg-white p-2 rounded-sm text-black text-xl group-hover:bg-light-gray"
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
};

export default GoogleButton;
