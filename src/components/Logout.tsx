import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mylink-backend.onrender.com/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  return (
    <div>
      <button
        className="bg-green-500 position-absolute rounded-pill p-2 px-5 mx-4 mt-4 border-0 text-white end-0 fw-bolder"
        onClick={(e) => handleLogout(e)}
      >
        Logout
      </button>
    </div>
  );
}
