import axios from "axios";

export const apiTinyPng = axios.create({
  //Common configurations:
  baseURL: "https://api.tinify.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    // Authorization: "Basic " + process.env.REACT_APP_TINY_PNG_API_KEY,
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
  auth: {
    username: `api:${process.env.REACT_APP_TINY_PNG_API_KEY}`,
    password: ``,
  },
});

//Post configurations:
apiTinyPng.defaults.headers.post["Content-Type"] = "application/json";
