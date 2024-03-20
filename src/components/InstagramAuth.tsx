import React from "react";
import axios from "axios";
import querystring from "querystring";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function InstagramAuth() {
  const [displayMessage, setDisplayMessage] = useState();
  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    (async () => {
      if (searchParams.get("code")) {
        const message = await getToken1(searchParams);
        console.log(message);
        setDisplayMessage(message);
      }
    })();
  }, []);

  return (
    <div className="h-screen">
      <div className="text-center flex justify-content-center align-content-center font-bold text-xl">
        {displayMessage}
      </div>
    </div>
  );
}

const getToken1 = async (searchParams: URLSearchParams) => {
  const data = {
    client_id: import.meta.env.VITE_APP_INSTAGRAM_APP_IDD,
    client_secret: import.meta.env.VITE_APP_INSTAGRAM_SECRET,
    code: searchParams.get("code"),
    grant_type: "authorization_code",
    redirect_uri: import.meta.env.VITE_APP_INSTAGRAM_REDIRECT_URI,
  };
  const requestBody = querystring.stringify(data);
  console.log(requestBody);
  const response = await axios.post(
    "https://mylink-backend.onrender.com/instagram-auth",
    requestBody
  );
  return response.data;
};

const getMedia = async () => {
  try {
    const response = await axios.get(
      "https://graph.instagram.com/instagram-api",
      {
        params: {
          client_id: import.meta.env.VITE_APP_INSTAGRAM_APP_IDD,
          redirect_uri: import.meta.env.VITE_APP_INSTAGRAM_REDIRECT_URI,
          scope: "user_profile,user_media",
          response_type: "code",
        },
        withCredentials: true,
      }
    );
  } catch (error) {}
};

export default InstagramAuth;
