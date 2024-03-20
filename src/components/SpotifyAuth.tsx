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
      }
    };
  }, []);
  return <div>SpotifyAuth</div>;
}

export default SpotifyAuth;
