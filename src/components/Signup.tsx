import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Attempt sign in if not display error
    try {
      console.log("test1");
      const response = await axios.post(
        "http://localhost:5000/signup",
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      {alert && (
        <div
          className="alert position-absolute mb-5 alert-danger"
          style={{ top: "180px" }}
          role="alert"
        >
          Account with that email already exists
        </div>
      )}
      <div className="fs-1  fw-bold">Register</div>
      <form
        action=""
        className="d-flex w-100 flex-column align-items-center justify-content-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="row justify-content-center text-center w-100">
          <div className="col-md-5">
            <label className="fw-bold">email</label>
            <input
              type="email"
              className="form-control rounded-pill border-0 p-2"
              id="email"
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="row justify-content-center mt-4 text-center w-100">
          <div className="col-md-5">
            <label className="fw-bold">username</label>
            <input
              type="text"
              className="form-control rounded-pill border-0 p-2"
              id="username"
              placeholder="myLink.com/username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="row justify-content-center text-center w-100 mt-4">
          <div className="col-md-5">
            <label className="fw-bold">email</label>
            <input
              type="password"
              className=" w-100 form-control rounded-pill border-0 p-2"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="row w-100 justify-content-center">
          <button
            type="submit"
            className="col-md-4 submit rounded-pill p-2 mt-4 border-0 text-white "
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
