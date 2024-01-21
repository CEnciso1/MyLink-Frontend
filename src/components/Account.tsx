import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import "../css/Account.css";
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
          `http://localhost:5000/account-data/${username}`
        );
        console.log(response);
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
    <div className="vh-100 text-center">
      <div className="container d-flex h-100">
        <div className=" position-absolute t option-button">
          <button
            className="border-0 bg-transparent"
            onClick={() => setShowLinks((state) => !state)}
          >
            <img
              className="option-image"
              src={showLinks ? linkImage : blocksImage}
            ></img>
          </button>
        </div>
        <div className="container d-flex flex-column align-items-center">
          <div className="fw-bolder mt-5">@{username}</div>
          {links && (
            <div className="content-container container position-absolute d-flex flex-column py-3 rounded-2 w-100">
              {showLinks && (
                <div>
                  {links.map((item, index) => (
                    <div className="w-100 justify-content-center d-flex">
                      <button
                        className="border-0 link mt-2 rounded-3 py-3 fw-bolder"
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
