const SubCard = (props) => {
  return (
    <div className={`shadow-lg rounded-lg text-center h-80 flex flex-col justify-evenly text-white ${props.customColor}`}>
      <div className="text-4xl">
        {props.sub.price}
        <sup>$</sup>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2">{props.sub.description}</div>
      </div>
    </div>
  );
};

export default SubCard;
