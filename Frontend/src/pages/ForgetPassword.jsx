import React, { useState } from "react";
import toast from "react-hot-toast";
import { forgetPasswordUrl } from "../config/ApiUrl";
import { errorToast } from "../utils/ToastHandler";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../config/AxiosInstance";

function ForgetPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

  const changeHandler = (event) => {
    setData({
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(forgetPasswordUrl, data);
      // if success become false
      if (!response.data.success) {
        toast.error(response.data.message);
      }
      // if success become true
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verify-otp",{ state: data});
        setData({
          email: "",
        });
      }
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div className="w-full container text-white mt-4 p-4">
      <div
        className="w-full mx-auto max-w-lg px-8 py-5 rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(2, 0, 36, 1) 0%, rgba(9, 11, 121, 1) 33%, rgba(0, 138, 255, 1) 100%)",
        }}
      >
        <p className="w-full font-semibold text-2xl text-center">
          Forget Password
        </p>
        <form onSubmit={submitHandler}>
          {/* Email  */}
          <div className="my-4">
            <input
              className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-100 text-black mt-2"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={changeHandler}
              autoFocus={true}
            />
          </div>
          <button className="w-full bg-black text-white py-3 my-3 rounded-xl font-semibold text-lg tracking-wide">
            Send OTP
          </button>
        </form>
        <p className="text-center mb-2 text-neutral-200">
          Already have account ?
          <Link to={"/login"} className="text-black font-semibold pl-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
