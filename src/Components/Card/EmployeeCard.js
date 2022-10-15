const EmployeeCard = (props) => {
  return (
    <div className="flex items-center justify-between shadow-md hover:shadow-lg cursor-pointer p-4 rounded-lg my-4">
      <div className="flex items-center">
        <div className="mr-3">
          <img src={props.employee.avatarPicture} className="w-12 rounded-full" alt="a" />
        </div>
        <div>
          <div className="font-bold">{props.employee.employeeName}</div>
          <div className="text-gray-500">{props.employee.phoneNumber}</div>
        </div>
      </div>

      <div>
        <button className="text-sm bg-orange p-2 rounded-lg text-white cursor-pointer shadow-md hover:shadow-lg ">
          Assign
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
