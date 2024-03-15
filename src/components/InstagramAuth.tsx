import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function InstagramAuth() {
  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams);
  return <div>test</div>;
}

export default InstagramAuth;
