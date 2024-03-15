import React from "react";
import axios from "axios";
import querystring from "querystring";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function InstagramAuth() {
  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams);

  useEffect(() => {
    if (searchParams.get("code")) {
      const getToken = async () => {
        const data = {
          client_id: process.env.REACT_APP_INSTAGRAM_APP_IDD,
          client_secret: process.env.REACT_APP_INSTAGRAM_SECRET,
          code: searchParams.get("code"),
          grant_type: "authorization_code",
          redirect_uri: process.env.REACT_APP_INSTAGRAM_REDIRECT_URI,
        };
        const requestBody = querystring.stringify(data);
        const response = await axios.post(
          "https://api.instagram.com/oauth/access_token",
          requestBody,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log("RESPONSE", response.data);
      };
      getToken();
    }
  });

  return <div>test</div>;
}

export default InstagramAuth;
