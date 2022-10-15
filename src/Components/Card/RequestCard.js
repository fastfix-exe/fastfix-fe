const RequestCard = (props) => {
  return (
    <div className="flex items-center justify-between shadow-md hover:shadow-lg cursor-pointer p-4 rounded-lg my-4">
      <div className="flex items-center">
        <div className="mr-3">
          <img
            src={props.request.customer.avatarPicture}
            className="rounded-full w-12 h-12"
            alt="a"
          />
        </div>
        <div>
          <div className="font-bold">{props.request.customer.customerName}</div>
          <div className="text-gray-500">
            {props.request.customer.phoneNumber
              ? props.request.customer.phoneNumber
              : "0930069772"}
          </div>
        </div>
      </div>

      <div>
        <button  onClick={props.onClick} className="text-sm bg-orange p-2 rounded-lg text-white cursor-pointer shadow-md hover:shadow-lg ">Pick employee</button>
      </div>
    </div>
  );
};

export default RequestCard;
