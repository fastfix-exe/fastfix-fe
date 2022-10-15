import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../Components/Input/TextInput";
import { AiFillSetting, AiFillCheckCircle } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import userApi from "../../API/Services/userApi";
import { userAction } from "../../Store/Slice/userSlice";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [appUser, setAppUser] = useState({
    customerName: "",
    dateOfBirth: "",
    gender: 0,
    phoneNumber: "",
    avatarPicture: "",
    refreshToken: "",
    email: "",
  });

  const logOut = async () => {
    try {
      const response = await userApi.logout({
        refreshToken: user.tokens.refreshToken,
      });
      if (response?.status === 200) {
        dispatch(userAction.logout());
        navigate("/login");
      } else {
        console.log("Log out failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = (e) => {
    const { name, value } = e.target;
    setAppUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateUser = async () => {
    setDisabled(true);
    // try {
    //   const response = await userApi.updateCustomer(appUser);
    //   if (response?.status === 200) {
    //     dispatch(userAction.login(response.data));
    //   } else {
    //     console.log("Update failed");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    console.log(appUser);
  };

  useEffect(() => {
    if (user) {
      setAppUser({
        customerName: user.loginUser.customerName,
        dateOfBirth: user.loginUser.dateOfBirth,
        gender: user.loginUser.gender,
        phoneNumber: user.loginUser.phoneNumber,
        avatarPicture: user.loginUser.avatarPicture,
        refreshToken: user.loginUser.refreshToken,
        email: user.loginUser.email,
      });
    }
  }, [user]);

  return (
    <>
      {user && (
        <div>
          {/* {disabled ? (
            <div
              className="absolute right-2 top-10 flex justify-center text-2xl cursor-pointer hover:shadow-md rounded-full p-1"
              onClick={() => setDisabled(false)}
            >
              <FaUserEdit />
            </div>
          ) : (
            <div
              className="absolute right-2 top-10 flex justify-center text-2xl cursor-pointer hover:shadow-md rounded-full p-1 bg-orange text-white"
              onClick={updateUser}
            >
              <AiFillCheckCircle />
            </div>
          )} */}
          <h1 className="text-center py-4">User Information</h1>
          <div className="flex justify-center">
            <img
              className="rounded-full"
              src={appUser.avatarPicture}
              alt="avatar"
            />
          </div>
          <div className="text-center">
            <h2>{appUser.customerName}</h2>
          </div>
          <div className="my-10">
            <div>
              <h4>Email</h4>
              <TextInput
                placeholder="email"
                name="email"
                value={appUser.email}
                disabled={true}
              />
            </div>
            <div>
              <h4>Date of birth</h4>
              <TextInput
                placeholder="date of birth"
                name="dateOfBirth"
                value={appUser.dateOfBirth ? appUser.dateOfBirth : "Not set"}
                disabled={disabled}
                onChange={getData}
              />
            </div>
            <div>
              <h4>Gender</h4>
              <TextInput
                placeholder="gender"
                name="gender"
                value={appUser.gender ? appUser.gender : "Not set"}
                disabled={disabled}
                onChange={getData}
              />
            </div>
            <div>
              <h4>Phone</h4>
              <TextInput
                placeholder="phoneNumber"
                name="phoneNumber"
                value={appUser.phoneNumber ? appUser.phoneNumber : "Not set"}
                disabled={disabled}
                onChange={getData}
              />
            </div>
          </div>
          <hr />
          <div className="mb-20">
            <div
              className="flex rounded-md shadow-md hover:shadow-lg p-2 items-center cursor-pointer mb-4 text-red-600"
              onClick={logOut}
            >
              <BsArrowReturnLeft className="mr-2 text-3xl" />
              <h1 className="text-2xl ">Log out</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
