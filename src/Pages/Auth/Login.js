import { useState, useEffect } from "react";
import TextInput from "../../Components/Input/TextInput";
import PasswordInput from "../../Components/Input/PasswordInput";
import ConfirmButton from "../../Components/Button/ConfirmButton";
import GoogleButton from "../../Components/Button/GoogleButton";
import logo from "../../Pictures/f-logo.png";
import userApi from "../../API/Services/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../../Store/Slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const getData = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  const loginGoogle = async (response) => {
    const creadentialId = response.credential;
    try {
      const response = await userApi.loginWithGoogle({
        credentialId: creadentialId,
      });
      if (response?.status === 200) {
        dispatch(userAction.login(response.data));
        navigate("/dashboard");
      } else {
        console.log("Google login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const storeLogin = async () => {
    try {
      const response = await userApi.loginAsStore(user);
      if (response?.status === 200) {
        dispatch(userAction.login(response.data));
        navigate("/");
      } else {
        alert("Fail to login");
      }
    } catch (error) {
      console.log("Login: " + error);
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: loginGoogle,
    });
    google.accounts.id.renderButton(document.getElementById("SigninGoogle"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center py-4 font-black">Login</h1>
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="w-24 h-auto" />
      </div>
      <div className="mt-3 text-center">
        <h3>Login as store</h3>
      </div>
      <div className="mt-3">
        <div className="h-24">
          <TextInput
            placeholder="Enter your email"
            name="email"
            value={user.email}
            onChange={getData}
          />
        </div>
        <div className="h-10">
          <PasswordInput
            placeholder="Enter your password"
            name="password"
            value={user.password}
            onChange={getData}
          />
        </div>
        <div className="flex items-center justify-around mt-10">
          <hr className="w-32 border-none h-px bg-black" />
          <h3>or as driver</h3>
          <hr className="w-32 border-none h-px bg-black" />
        </div>
        <div className="mt-10">
          <div className="flex justify-center" id="SigninGoogle"></div>
        </div>
        <div className="mt-20">
          <ConfirmButton text="Login" onClick={storeLogin} />
        </div>
        <div className="mt-4 flex justify-center">
          <h3 className="text-orange">Welcome to FastFix</h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
