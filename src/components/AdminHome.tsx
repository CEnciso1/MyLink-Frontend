import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Logout from "./Logout";
import blocksImage from "../assets/blocks.svg";
import linkImage from "../assets/link.svg";
import instagramImage from "../assets/instagram.svg";
import deleteImage from "../assets/delete.svg";
import closeImage from "../assets/close.svg";
import editImage from "../assets/edit.svg";
import "../css/AdminHome.css";
import axios, { AxiosRequestConfig } from "axios";
import { useAuth } from "../auth/AuthContext";

export default function AdminHome() {
  const { username } = useParams();
  const [showLinks, setShowLinks] = useState(true);
  const [showAddLink, setShowAddLink] = useState(true);
  const [links, setLinks] = useState();
  const [newLink, setNewLink] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const { userData, setUserData } = useAuth();
  const [editFlags, setEditFlags] = useState(
    Array(userData?.links.length).fill(false)
  );

  useEffect(() => {}, []);

  const optionClick = () => {
    setShowLinks((state) => !state);
    setShowAddLink(false);
  };

  const handleDeleteLink = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    link: object
  ) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://mylink-backend.onrender.com/delete-link",
        {
          _id: userData?._id,
          link: link,
        }
      );
      console.log("response", response);
      const temp = userData?.links.filter((item) => item !== link);
      console.log(temp);
      if (setUserData && temp) {
        setUserData((userData) => ({
          ...userData,
          links: temp,
        }));
      }
    } catch (error) {}
  };

  const handleNewLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mylink-backend.onrender.com/add-link",
        {
          _id: userData?._id,
          links: [
            ...(userData?.links || []),
            { link: newLink, title: linkTitle },
          ],
        }
      );
      if (setUserData)
        setUserData((userData) => ({
          ...userData,
          links: [...userData.links, { link: newLink, title: linkTitle }],
        }));
      setShowAddLink(false);
    } catch (error) {
      console.log(error);
    }
  };

  const connectInstagram = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.get("//api.instagram.com/oauth/authorize", {
        params: {
          client_id: import.meta.env.VITE_INSTAGRAM_APP_ID,
          redirect_uri: import.meta.env.VITE_REDIRECT_URI,
          scope: "user_profile,user_media",
          response_type: "code",
        },
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setFlagTrue = async (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const temp = editFlags;
    temp[index] = true;
    setEditFlags([...temp]);
    console.log(index, temp[index]);
  };

  const setFlagFalse = (index: number) => {
    const temp = editFlags;
    temp[index] = false;
    setEditFlags([...temp]);
    console.log(index, temp[index]);
  };

  const handleTitleChange = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.FocusEvent<HTMLInputElement, Element>,
    index: number
  ) => {
    e.preventDefault();
    console.log("title change");
    try {
      const response = await axios.put(
        "https://mylink-backend.onrender.com/edit-link",
        {
          _id: userData?._id,
          index: index,
          newTitle: newTitle,
        }
      );
      if (userData && setUserData) {
        userData.links[index].title = newTitle;
        setUserData(userData);
      }
    } catch (error) {
      console.log(error);
    }
    setFlagFalse(index);
  };

  return (
    <div className="vh-100">
      <Logout></Logout>
      <div className="container d-flex flex-column align-items-center">
        <div className=" position-absolute t option-button">
          <button
            className="border-0 bg-transparent"
            onClick={() => optionClick()}
          >
            <img
              className="option-image"
              src={showLinks ? linkImage : blocksImage}
            ></img>
          </button>
        </div>
        {showLinks && (
          <div className="options-bar justify-content-end d-flex w-100 flex-row">
            <div className="">
              <button
                className="border-0 rounded-3 bg-light p-2 px-3 add-link fw-bolder"
                onClick={() => setShowAddLink((state) => !state)}
              >
                add link
              </button>
            </div>
          </div>
        )}
        {showAddLink && (
          <div className="container position-absolute rounded border link-form bg-light py-5">
            <div>
              <button
                className="border-0 close-button position-relative bg-transparent"
                onClick={() => setShowAddLink(false)}
              >
                <img src={closeImage}></img>
              </button>
            </div>
            <div className="new-link position-relative">
              <div className="fw-bolder p-2">Enter URL and Title</div>
              <form onSubmit={(e) => handleNewLink(e)}>
                <div className="d-flex flex-row ">
                  <input
                    type="text"
                    className="form-control rounded-pill border-2 "
                    id="link"
                    placeholder="myLink.com"
                    onChange={(e) => setNewLink(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    className="form-control rounded-pill  border-2 w-25"
                    id="title"
                    placeholder="title"
                    onChange={(e) => setLinkTitle(e.target.value)}
                  ></input>
                  <button
                    type="submit"
                    className="col-md-4 submit rounded-pill mx-2 p-2 border-0 text-white "
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {!showAddLink && (
          <div className="container content-container py-3 rounded-2">
            {showLinks && (
              <div>
                {userData?.links.map((item, index) => (
                  <div className="bg-light link-container mt-2 rounded-2">
                    <div className="mx-5 position-relative link-content justify-content-evenly d-flex flex-column">
                      <>
                        {!editFlags[index] ? (
                          <button
                            className="border-0 p-0 content bg-light fw-bold t"
                            onClick={(e) => setFlagTrue(index, e)}
                          >
                            <span>{item.title}</span>
                            <img src={editImage}></img>
                          </button>
                        ) : (
                          <form onSubmit={(e) => handleTitleChange(e, index)}>
                            <input
                              className="border-1 bg-transparent t"
                              type="text"
                              id={`input-${index}`}
                              placeholder={item.title}
                              onChange={(e) => setNewTitle(e.target.value)}
                              onBlur={(e) => handleTitleChange(e, index)}
                            ></input>
                          </form>
                        )}
                        <div>{item.link}</div>
                      </>
                    </div>
                    <div className="position-relative delete-link">
                      <button
                        className="border-0 bg-transparent"
                        onClick={(e) => handleDeleteLink(e, item)}
                      >
                        <img src={deleteImage}></img>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!showLinks && (
              <button
                className="bg-transparent border-0"
                onClick={(e) => connectInstagram(e)}
              >
                <img src={instagramImage}></img>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
