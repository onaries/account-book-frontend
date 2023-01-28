import axios from "axios";
import { baseUrl } from "../../consts";

export const client = axios.create({
  baseURL: baseUrl,
});
