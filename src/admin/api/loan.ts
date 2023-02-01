import { client } from "./index";

export const getTotalLoan = async () => {
  const { data } = await client.get(`/loan/total`);
  return data;
};
