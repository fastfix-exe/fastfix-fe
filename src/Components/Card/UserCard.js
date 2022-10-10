const UserCard = (props) => {
  return (
    <div className="w-full rounded-lg flex shadow-md p-3 cursor-pointer hover:shadow-lg transition-all bg-white">
      <div className="overflow-hidden rounded-full w-12">
        <img src={props.user.avatarPicture} alt="avatar" />
      </div>
      <div className="ml-2">
        <div>{props.user.customerName ? props.user.customerName : props.user.storeName}</div>
        <div>{props.user.email}</div>
      </div>
    </div>
  );
};

export default UserCard;
