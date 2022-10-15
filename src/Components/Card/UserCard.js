const UserCard = (props) => {
  return (
    <div className="w-full rounded-lg flex shadow-md p-3 cursor-pointer hover:shadow-lg transition-all bg-white items-center gap-2">
      <div className="overflow-hidden rounded-full border border-black p-1">
        <img
          src={props.user.avatarPicture}
          className="rounded-full w-12"
          alt="avatar"
        />
      </div>
      <div>
        {props.user.employeeName ? (
          <>
            <div className="font-bold">
              {props.user.employeeName
                ? props.user.employeeName
                : props.user.employeeName}
            </div>
            <div>{props.user.phoneNumber}</div>
          </>
        ) : (
          <>
            <div className="font-bold">
              {props.user.customerName
                ? props.user.customerName
                : props.user.storeName}
            </div>
            <div>{props.user.email}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
