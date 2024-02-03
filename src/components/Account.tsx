import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import blocksImage from "../assets/blocks.svg";
import linkImage from "../assets/link.svg";

function Account() {
  const { username } = useParams();
  const [links, setLinks] = useState(Array());
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
        console.log("test");
        if (response.data.links) {
          setLinks(response.data.links);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
              src={showLinks ? linkImage : blocksImage}
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
        </div>
      </div>
    </div>
  );
}

export default Account;
