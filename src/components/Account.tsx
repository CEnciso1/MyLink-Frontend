import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import blocksImage from "../assets/blocks.svg";
import linkImage from "../assets/link.svg";
import { userData } from "../interfaces/UserData";

function Account() {
  const { username } = useParams();
  const [links, setLinks] = useState(Array());
  const [instagramApi, setInstagramApi] = useState();
  const [instagramApiData, setInstagramApiData] = useState();
  const [haveApi, setHaveApi] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(username);
        const response = await axios.get(
          `https://mylink-backend.onrender.com/account-data/${username}`
        );
        console.log(response);
        if (response.data.apis) {
          setHaveApi(true);
        }
        if (response.data.apis.instagram) {
          console.log(response.data.apis.instagram);
          setInstagramApi(response.data.apis.instagram);
          const u_id = response.data.apis.instagram.user_id;
          const u_idString = u_id.toString();
          const responseData = fetchInstagramApiData(
            response.data.apis.instagram.access_token,
            "jdjdjsbbd"
          );
          console.log(responseData);
        }
        if (response.data.links) {
          setLinks(response.data.links);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const fetchInstagramApiData = async (
    access_token: string,
    user_id: string
  ) => {
    const response = await axios.get(
      `https://graph.instagram.com/${user_id}/media`,
      {
        params: {
          access_token: access_token,
          fields: "media_type, media_url",
        },
      }
    );
    return response.data;
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    link: string
  ) => {
    window.open(link, "_blank");
  };

  return (
    <div className="h-screen">
      <div className="container flex flex-col items-center h-100">
        <div className="relative top-32 z-10 ">
          <button
            className="border-0 bg-transparent h-10 w-10"
            onClick={() => setShowLinks((state) => !state)}
          >
            <img
              className="option-image h-10 w-10"
              src={showLinks ? blocksImage : linkImage}
            ></img>
          </button>
        </div>
        <div className="font-bold text-2xl mt-3">@{username}</div>
        <div className="flex flex-col items-center">
          {links && (
            <div className="top-44 absolute flex flex-col py-3 w-5/6 justify-center">
              {showLinks && (
                <div>
                  {links.map((item, index) => (
                    <div>
                      <button
                        className="bg-white w-100 mt-2 mb-2 rounded-3xl py-3 fw-bolder"
                        onClick={(e) => handleLinkClick(e, item.link)}
                      >
                        {item.title}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {haveApi && <div></div>}
        </div>
      </div>
    </div>
  );
}

export default Account;
