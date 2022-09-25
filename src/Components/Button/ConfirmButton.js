const ConfirmButton = (props) => {
  return <button className="bg-orange p-2 rounded-lg w-full text-white font-bold text-2xl hover:bg-orange-hover active:bg-orange-active" onClick={props.onClick}>{props.text}</button>;
};

export default ConfirmButton;
