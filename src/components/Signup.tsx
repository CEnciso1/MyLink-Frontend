import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      validateEmail(email),
      password.length > 6,
      (document?.getElementById("submit") as HTMLButtonElement)?.disabled
    );
    if (validateEmail(email) && password.length > 6) {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }
  }, [email, password]);

  const validateEmail = (email: string) => {
    var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Attempt sign in if not display error
    try {
      const response = await axios.post(
        "https://mylink-backend.onrender.com/signup",
        {
          email: email,
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.success);
      if (response.data.success) navigate("/");
      setAlert(!response.data.success);
      setAlertMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {alert && (
        <div className="alert absolute mb-5 alert-danger top-44" role="alert">
          {alertMessage}
        </div>
      )}
      <div className="relative text-5xl font-bold bottom-4">Register</div>
      <form
        action=""
        className="flex w-5/6 relative bottom-4 flex-col items-center justify-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mt-3 w-4/6">
          <label className="font-bold">email</label>
          <input
            type="email"
            className="form-control rounded-3xl border-0 p-2"
            id="email"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="mt-3 w-4/6">
          <label className="fw-bold">username</label>
          <input
            type="text"
            className="form-control rounded-3xl border-0 p-2"
            id="username"
            placeholder="myLink.com/username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="mt-3 w-4/6">
          <label className="fw-bold">password</label>
          <input
            type="password"
            className=" w-100 form-control rounded-3xl border-0 p-2"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className={
            "w-1/3 rounded-3xl p-2 mt-4 border-0 text-white font-bold " +
            (allowSubmit ? "bg-green-500" : "bg-green-800")
          }
          id="submit"
          disabled={!allowSubmit}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
