import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { otpVerificationUrl } from "../config/ApiUrl";
import { errorToast } from "../utils/ToastHandler.js";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axiosInstance from "../config/AxiosInstance";

function VerifyOTP() {
  const navigate = useNavigate();
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const location = useLocation()

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forget-password")
    }
  }, [])

  // onchange handler (autofocus on next input)
  const changeHandler = (event, index) => {
    const { value } = event.target
    data[index] = value
    setData([...data])
    if (value && index < 5) {
      inputRef.current[index + 1].focus()
    }
  };
  // keydown handler (autofocus on previous input)
  const keyDownHandler = (event, index) => {
    if (event.key === "Backspace" && !data[index] && index > 0) {
      inputRef.current[index - 1].focus()
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(otpVerificationUrl, {
        email: location?.state?.email,
        otp: data.join("")
      });
      // if success become false
      if (!response.data.success) {
        toast.error(response.data.message);
      }
      // if success become true
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(data);
        navigate("/reset-password", {
          state: { 
            email: location?.state?.email,
          }
        });
        setData(["", "", "", "", "", ""]);
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
          Enter Your OTP
        </p>
        <form onSubmit={submitHandler}>
          {/* OTP  */}
          <div className="my-4 flex gap-3">
            {
              data.map((digit, index) => {
                return (
                  <input key={"otp" + index}
                    className="w-full py-2  px-4 text-lg rounded-lg outline-none bg-neutral-100 text-black mt-2 text-center font-semibold"
                    type="text"
                    maxLength={1}
                    value={data[index]}
                    onChange={(e) => changeHandler(e, index)}
                    onKeyDown={(e) => keyDownHandler(e, index)}
                    ref={(ref) => (inputRef.current[index] = ref)}
                  />
                )
              })
            }
          </div>
          <button className="w-full bg-black text-white py-3 my-3 rounded-xl font-semibold text-lg tracking-wide">
            Verify OTP
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

export default VerifyOTP;
