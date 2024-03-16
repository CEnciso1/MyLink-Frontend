import React from "react";
import axios from "axios";
import querystring from "querystring";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function InstagramAuth() {
  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    if (searchParams.get("code")) {
      getToken1(searchParams);
    }
  }, []);

  return <div>test</div>;
}

// const getToken = async () => {
//   const data = {
//     client_id: import.meta.env.VITE_APP_INSTAGRAM_APP_IDD,
//     client_secret: import.meta.env.VITE_APP_INSTAGRAM_SECRET,
//     code: searchParams.get("code"),
//     grant_type: "authorization_code",
//     redirect_uri: import.meta.env.VITE_APP_INSTAGRAM_REDIRECT_URI,
//   };
//   const requestBody = querystring.stringify(data);
//   const response = await axios.post(
//     "https://api.instagram.com/oauth/access_token",
//     requestBody,
//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     }
//   );
//   console.log("RESPONSE", response.data);
// };

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
  console.log("RESPONSE", response.data);
};

// const getLongAccessToken = async () =>{
//   try{

//     const data = {
//       client_id: import.meta.env.VITE_APP_INSTAGRAM_APP_IDD,
//       client_secret: import.meta.env.VITE_APP_INSTAGRAM_SECRET,
//       code: searchParams.get("code"),
//       grant_type: "authorization_code",
//       redirect_uri: import.meta.env.VITE_APP_INSTAGRAM_REDIRECT_URI,
//     };
//     const requestBody = querystring.stringify(data);
//     const response = await axios.post(
//       "https://api.instagram.com/oauth/access_token",
//       requestBody,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//   }catch(error){
//     console.log(error)
//   }
// }

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