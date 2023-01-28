import axios from "axios";
import { client } from "./index";
import dayjs from "dayjs";

export const getTotalAmount = async () => {
  const { data } = await client.get("/statement/total", {
    params: {
      id: 1,
      mode: 3,
      date: dayjs().format("YYYY-MM-DDTHH:mm"),
    },
  });
  return data;
};
export const getTotalAmountByCategory = async () => {
  const { data } = await client.get("/statement/category-total", {
    params: {
      date: dayjs().format("YYYY-MM-DDTHH:mm"),
    },
  });

  return data;
};

export const postAlertStatement = async ({ mutationKey }: { mutationKey: any }) => {
  const { id } = mutationKey;
  const { data } = await client.post(`/statement/${id}/alert`);

  return data;
};
