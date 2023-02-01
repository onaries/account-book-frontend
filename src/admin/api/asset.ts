import { client } from "./index";

export const getTotalAsset = async () => {
  const { data } = await client.get(`/asset/total`);
  return data;
};
