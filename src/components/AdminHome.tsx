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
import axios, { AxiosRequestConfig } from "axios";
import { useAuth } from "../auth/AuthContext";

export default function AdminHome() {
  const { username } = useParams();
  const [showLinks, setShowLinks] = useState(true);
  const [showAddLink, setShowAddLink] = useState(false);
  const [links, setLinks] = useState();
  const [newLink, setNewLink] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const { userData, setUserData } = useAuth();
  const [editFlags, setEditFlags] = useState(
    Array(userData?.links.length).fill(false)
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

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
        },
        { withCredentials: true }
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
        },
        { withCredentials: true }
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
      const response = await axios.get(
        "https://mylink-backend.onrender.com/instagram-api",
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
      console.log("client_id", import.meta.env.VITE_APP_INSTAGRAM_REDIRECT_URI);
      window.open(response.data, "_blank");
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
        },
        { withCredentials: true }
      );
      if (userData && setUserData) {
        userData.links[index].title = newTitle;
        setUserData(userData);
        setNewTitle("");
      }
    } catch (error) {
      console.log(error);
    }
    setFlagFalse(index);
  };

  return (
    <div className="h-screen w-screen">
      <Logout></Logout>
      <div className="container h-full flex flex-col items-center p-0">
        <div className="relative top-32 z-10 ">
          <button
            className="border-0 bg-transparent h-10 w-10"
            onClick={() => optionClick()}
          >
            <img
              className="option-image h-10 w-10"
              src={showLinks ? linkImage : blocksImage}
            ></img>
          </button>
        </div>
        <div className="font-bold text-2xl mt-3">
          <a href={`https://mylink-frontend.onrender.com/${username}`}>
            @{username}
          </a>
        </div>
        {showLinks && (
          <div className="relative flex flex-row justify-end mr-4 top-16 w-100 items-end">
            <button
              className="bg-white rounded-md py-2 px-2 mt-2 font-bold"
              onClick={() => setShowAddLink((state) => !state)}
            >
              add link
            </button>
          </div>
        )}
        {showAddLink && (
          <div className="container absolute top-48 rounded link-form bg-white py-4">
            <div className="flex flex-row justify-end">
              <button
                className="border-0 relative bg-transparent bottom-3"
                onClick={() => setShowAddLink(false)}
              >
                <img src={closeImage}></img>
              </button>
            </div>
            <div className="bottom-5 relative">
              <div className="font-bold text-xl p-2">Enter URL and Title</div>
              <form onSubmit={(e) => handleNewLink(e)}>
                <div className="flex flex-row">
                  <input
                    type="text"
                    className="form-control rounded-3xl border-2 "
                    id="link"
                    placeholder="myLink.com"
                    onChange={(e) => setNewLink(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    className="form-control ml-2 rounded-pill border-2"
                    id="title"
                    placeholder="title"
                    onChange={(e) => setLinkTitle(e.target.value)}
                  ></input>
                  <button
                    type="submit"
                    className="bg-green-500 w-60 submit rounded-pill ml-2 p-2 border-0 text-white font-bold"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {!showAddLink && (
          <div className="container top-44  absolute py-3 px-10 rounded-2">
            {showLinks && (
              <div>
                {userData?.links.map((item, index) => (
                  <div className="bg-white h-fit w-100 py-3 mt-2 rounded-2">
                    <div className="relative h-4/5 ml-8 flex flex-col">
                      <>
                        {!editFlags[index] ? (
                          <button
                            className="border-0 p-0 content bg-white font-bold w-fit"
                            onClick={(e) => setFlagTrue(index, e)}
                          >
                            <span className="flex flex-row mb-2">
                              {item.title}
                              <img src={editImage}></img>
                            </span>
                          </button>
                        ) : (
                          <form onSubmit={(e) => handleTitleChange(e, index)}>
                            <input
                              className="border-1 form-control bg-transparent w-fit"
                              type="text"
                              id={`input-${index}`}
                              placeholder={item.title}
                              onChange={(e) => setNewTitle(e.target.value)}
                              onBlur={(e) => handleTitleChange(e, index)}
                            ></input>
                          </form>
                        )}
                        <div className="w-5/6 h-fit break-words">
                          {item.link}
                        </div>
                      </>
                      <div className="absolute self-end mr-4">
                        <button
                          className="border-0 bg-transparent"
                          onClick={(e) => handleDeleteLink(e, item)}
                        >
                          <img src={deleteImage}></img>
                        </button>
                      </div>
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
