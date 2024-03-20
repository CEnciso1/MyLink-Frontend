import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import blocksImage from "../assets/blocks.svg";
import linkImage from "../assets/link.svg";
import querystring from "querystring";
import instagramImage from "../assets/instagram.svg";
import spotifyImage from "../assets/spotify.svg";
import closeImage from "../assets/close.svg";
import { userData } from "../interfaces/UserData";
import { access } from "fs";

function Account() {
  const { username } = useParams();
  const [links, setLinks] = useState(Array());
  const [instagramApi, setInstagramApi] = useState();
  const [instagramApiData, setInstagramApiData] = useState(Array());
  const [spotifyApi, setSpotifyApi] = useState();
  const [spotifyApiData, setSpotifyApiData] = useState(Array());
  const [haveApi, setHaveApi] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
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

          if (response.data.apis.instagram) {
            console.log(response.data.apis.instagram);
            console.log(
              typeof response.data.apis.instagram.user_id,
              typeof response.data.apis.instagram.access_token
            );

            setInstagramApi(response.data.apis.instagram);
            const responseData = await fetchInstagramApiData(
              response.data.apis.instagram.token,
              response.data.apis.instagram.user_id
            );
            console.log(responseData);
            setInstagramApiData(responseData.data);
          }
          if (response.data.apis.spotify) {
            console.log("Spotify");
            const spotifyResponse = await fetchSpotifyApiData(
              response.data.apis.spotify.refresh_token,
              response.data.apis.spotify.client_id
            );
            console.log(spotifyResponse);
            if (spotifyResponse) setSpotifyApiData(spotifyResponse.data.items);
          }
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
    user_id: number
  ) => {
    const response = await axios.get(
      `https://graph.instagram.com/${user_id}/media`,
      {
        params: {
          access_token: access_token,
          fields: "media_type, media_url, permalink, caption",
        },
      }
    );
    console.log(response.data.data);
    return response.data;
  };

  const fetchSpotifyApiData = async (
    refresh_token: string,
    client_id: string
  ) => {
    const body = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: client_id,
      client_secret: import.meta.env.VITE_APP_SPOTIFY_APP_SECRET,
    };
    console.log(body);
    const requestBody = querystring.stringify(body);
    console.log(requestBody);
    try {
      const refreshResponse = await axios.post(
        "https://mylink-backend.onrender.com/spotify-refresh",
        body
      );

      console.log("REFRESH RESPONSE", refreshResponse);
      //Get media
      const spotifyMedia = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          params: {
            time_range: "medium_term",
            limit: 10,
          },
          headers: {
            Authorization: `Bearer ${refreshResponse.data.access_token}`,
          },
        }
      );
      console.log(spotifyMedia);
      console.log(spotifyMedia.data);
      return spotifyMedia;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    link: string
  ) => {
    window.open(link, "_blank");
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center h-100">
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
        <div className="absolute top-12 font-bold text-2xl mt-3">
          @{username}
        </div>
        <div className="flex flex-col items-center">
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
            {!showLinks && (
              <div className="flex flex-col justify-content-evenly">
                {!showInstagram && (
                  <button
                    className="bg-transparent border-0 w-36 h-36"
                    onClick={() => setShowInstagram(true)}
                  >
                    <img src={instagramImage}></img>
                  </button>
                )}

                {showInstagram && (
                  <div>
                    <div className="flex flex-row justify-end">
                      <button
                        className="border-0 relative bg-transparent mb-3"
                        onClick={() => setShowInstagram(false)}
                      >
                        <img src={closeImage}></img>
                      </button>
                    </div>
                    <div className="flex justify-content-evenly flex-wrap">
                      {instagramApiData.map((item) => (
                        <div>
                          <img
                            className="max-w-full"
                            src={item.media_url}
                          ></img>
                          <div className="font-bold text-xl py-3 bg-white text-center">
                            {item.caption}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {!showSpotify && (
                  <button
                    className="bg-transparent border-0 mt-10 w-36 h-36"
                    onClick={() => setShowSpotify(true)}
                  >
                    <img src={spotifyImage}></img>
                  </button>
                )}
                {showSpotify && (
                  <div className="mt-5">
                    <div className="flex flex-row justify-end">
                      <button
                        className="border-0 relative bg-transparent mb-3"
                        onClick={() => setShowSpotify(false)}
                      >
                        <img src={closeImage}></img>
                      </button>
                    </div>
                    <div className="flex flex-col justify-content-evenly flex-wrap">
                      {spotifyApiData.map((item) => (
                        <div className="w-fit">
                          <div className="font-bold text-xl py-3 bg-white text-center">
                            {item.name}
                          </div>
                          <img
                            src={item.images[0].url}
                            className="max-w-full"
                          ></img>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
