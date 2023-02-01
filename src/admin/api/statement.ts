import axios from "axios";
import { client } from "./index";
import dayjs from "dayjs";

export const getTotalAmount = async ({ queryKey }: { queryKey: any }) => {
  const [_, key] = queryKey;

  const { data } = await client.get("/statement/total", {
    params: {
      id: 1,
      mode: 3,
      date: key ? key : dayjs().format("YYYY-MM-DDTHH:mm"),
    },
  });
  return data;
};
export const getTotalAmountByCategory = async ({ queryKey }: { queryKey: any }) => {
  const [_, key] = queryKey;

  const { data } = await client.get("/statement/category-total", {
    params: {
      date: key ? key : dayjs().format("YYYY-MM-DDTHH:mm"),
    },
  });

  return data;
};

export const postAlertStatement = async ({ mutationKey }: { mutationKey: any }) => {
  const { id } = mutationKey;
  const { data } = await client.post(`/statement/${id}/alert`);

  return data;
};

export const getStatementSummary = async ({ queryKey }: { queryKey: any }) => {
  const { data } = await client.get("/statement/summary", {
    params: {
      page: queryKey[1],
      size: queryKey[2],
      date_gte: queryKey[3],
      date_lte: queryKey[4],
      type: queryKey[5],
      category_id: queryKey[6],
      main_category_id: queryKey[7],
      order: "DESC",
      sort: "date",
    },
  });

  return data;
};
