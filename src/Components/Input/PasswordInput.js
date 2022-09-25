import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const PasswordInput = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        className="w-full p-4 text-xl bg-light-gray rounded-md"
        placeholder={props.placeholder}
        type={show ? "text" : "password"}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        autoComplete="off"
      />
      {show ? (
        <BsFillEyeFill
          className="absolute right-1 top-1/2 cursor-pointer -translate-y-1/2"
          onClick={() => setShow(false)}
        />
      ) : (
        <BsFillEyeSlashFill
          className="absolute right-1 top-1/2 cursor-pointer -translate-y-1/2"
          onClick={() => setShow(true)}
        />
      )}
    </div>
  );
};

export default PasswordInput;
