import axios from "axios";

export const apiTinyPng = axios.create({
  //Common configurations:
  baseURL: "https://api.tinify.com",
  headers: {
    "Authorization": `Basic ${process.env.TINY_PNG_API_KEY}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json"
  },
});

//Post configurations:
// apiTinyPng.defaults.headers.post["Content-Type"] = "application/json";
