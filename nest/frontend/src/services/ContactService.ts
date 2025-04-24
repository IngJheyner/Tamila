import axios from "axios";
import { ContactType } from "../types/ContactType";

export const sendDataContact = async (data: ContactType) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, data)
  .then((response) => {
    return response.status;
  })
  .catch((error) => {
    console.log("🚀 ~ sendDataContact ~ error:", error)
    return error.response.status;
  });
  return response;
};
