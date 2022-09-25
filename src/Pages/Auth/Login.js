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

  const login = async () => {
    try {
      const response = await userApi.login();
      if (response?.status === 200) {
        const tmpUser = {
          loginUser: {
            role: 1,
            id: "ae7f5ae3fa96ea9fea908e19fbd49f93",
            email: "haotnse150755@fpt.edu.vn",
            customerName: "Tran Nhi Hao",
            isDeleted: false,
            dateOfBirth: null,
            gender: null,
            phoneNumber: null,
            avatarPicture:
              "https://lh3.googleusercontent.com/a/ALm5wu0YpWe8Kz28J1rrdHBaJXwOK07bKxpMhq43Hf1w=s96-c",
          },
          tokens: {
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoxLCJpZCI6ImFlN2Y1YWUzZmE5NmVhOWZlYTkwOGUxOWZiZDQ5ZjkzIiwiZW1haWwiOiJoYW90bnNlMTUwNzU1QGZwdC5lZHUudm4iLCJjdXN0b21lck5hbWUiOiJUcmFuIE5oaSBIYW8iLCJpc0RlbGV0ZWQiOmZhbHNlLCJkYXRlT2ZCaXJ0aCI6bnVsbCwiZ2VuZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwiYXZhdGFyUGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTBZcFdlOEt6MjhKMXJyZEhCYUpYd09LMDdiS3hwTWhxNDNIZjF3PXM5Ni1jIiwiaWF0IjoxNjYzODI3MzAxLCJleHAiOjE2NjM4MjgyMDF9.fb0qNgVo2Y_GwzKpGhYWiH78Fq7UrwB3KHwV0bl5JSc",
            refreshToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoxLCJpZCI6ImFlN2Y1YWUzZmE5NmVhOWZlYTkwOGUxOWZiZDQ5ZjkzIiwiZW1haWwiOiJoYW90bnNlMTUwNzU1QGZwdC5lZHUudm4iLCJjdXN0b21lck5hbWUiOiJUcmFuIE5oaSBIYW8iLCJpc0RlbGV0ZWQiOmZhbHNlLCJkYXRlT2ZCaXJ0aCI6bnVsbCwiZ2VuZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwiYXZhdGFyUGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTBZcFdlOEt6MjhKMXJyZEhCYUpYd09LMDdiS3hwTWhxNDNIZjF3PXM5Ni1jIiwiaWF0IjoxNjYzODI3MzAxfQ.VD_Lt9nr4DQKyjEsqwfCVKentkfgW5uZ7kSz29FjHz4",
          },
        };
        dispatch(userAction.login(tmpUser));
        navigate("/dashboard");
      } else {
        console.log("Fail to login");
      }
    } catch (error) {
      console.log("Login: " + error);
    }
  };

  const loginGoogle = async (response) => {
    const creadentialId = response.credential;
    console.log(creadentialId);
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
        dispatch(userAction.login(user));
        navigate("/dashboard");
      } else {
        console.log("Fail to login");
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
      width: 400,
    });
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center py-4 font-black">Login</h1>
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="w-24 h-auto" />
      </div>
      <div className="mt-10">
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
          <hr className="w-40 border-none h-px bg-black" />
          <h1>or</h1>
          <hr className="w-40 border-none h-px bg-black" />
        </div>
        <div className="mt-10">
          {/* <GoogleButton text="Login with google" /> */}
          <div className="w-full" id="SigninGoogle"></div>
        </div>
        <div className="mt-28">
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
