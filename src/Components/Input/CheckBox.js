const CheckBox = (props) => {
  return (
    <div className="flex items-center justify-between">
      <label>{props.label}</label>
      <input type="CheckBox" className="bg-orange" />
    </div>
  );
};

export default CheckBox;
