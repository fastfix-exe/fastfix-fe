import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../Components/Input/TextInput";
import { AiFillSetting } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import userApi from "../../API/Services/userApi";
import { userAction } from "../../Store/Slice/userSlice";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(user.loginUser);

  const getdata = (e) => {
    const {name, value} = e.target;
    console.log(value);
  }

  const logOut = async () => {
    try {
      const response = await userApi.logout({
        refreshToken: user.tokens.refreshToken,
      });
      if(response?.status === 200){
        dispatch(userAction.logout());
        navigate("/login")
      } else {
        console.log("Log out failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && (
        <div>
          <h1 className="text-center py-4">User Information</h1>
          <div className="flex justify-center">
            <img
              className="rounded-full"
              src={user.loginUser.avatarPicture}
              alt="avatar"
            />
          </div>
          <div className="text-center">
            <h2>{user.loginUser.customerName}</h2>
          </div>
          <div className="my-10">
            <div>
              <h4>Email</h4>
              <TextInput placeholder="email" name="email" value={user.loginUser.email} />
            </div>
            <div>
              <h4>Date of birth</h4>
              <TextInput placeholder="date of birth" name="dateOfBirth"
                value={
                  user.loginUser.dateOfBirth
                    ? user.loginUser.dateOfBirth
                    : "11/10/2001"
                }
              />
            </div>
            <div>
              <h4>Gender</h4>
              <TextInput placeholder="gender" name="gender"
                value={user.loginUser.gender ? user.loginUser.gender : "Male"}
              />
            </div>
          </div>
          <hr />
          <div className="mb-20">
            <div className="flex rounded-md shadow-md hover:shadow-lg p-2 items-center cursor-pointer mb-4">
              <AiFillSetting className="mr-2 text-3xl" />
              <h1 className="text-2xl">Settings</h1>
            </div>
            <div
              className="flex rounded-md shadow-md hover:shadow-lg p-2 items-center cursor-pointer mb-4"
              onClick={logOut}
            >
              <BsArrowReturnLeft className="mr-2 text-3xl" />
              <h1 className="text-2xl">Log out</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
