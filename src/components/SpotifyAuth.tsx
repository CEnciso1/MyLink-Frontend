import React from "react";
import axios from "axios";
import querystring from "querystring";
import { useState, useEffect } from "react";

function SpotifyAuth() {
  const [displayMessage, setDisplayMessage] = useState();
  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    async () => {
      if (searchParams.get("code")) {
        const response = await axios.get(
          "https://mylink-backend.onrender.com/spotify-api",
          {
            params: {
              client_id: import.meta.env.VITE_APP_INSTAGRAM_APP_IDD,
              redirect_uri: import.meta.env.VITE_APP_INSTAGRAM_REDIRECT_URI,
              code: searchParams.get("code"),
              grant_type: "code",
            },
            withCredentials: true,
          }
        );
      }
    };
  }, []);
  return <div>SpotifyAuth</div>;
}

export default SpotifyAuth;
