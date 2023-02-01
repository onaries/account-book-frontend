import React, { useState } from "react";
import { Card, CardContent, Typography, Box, useMediaQuery } from "@mui/material";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { getTotalAmount, getTotalAmountByCategory } from "../../api/statement";
import { useRedirect } from "ra-core";
import { CATEGORY_TYPE_COLOR } from "../../../consts";

type MonthlyCardProps = {
  month: number;
};

const MonthlyCard: React.FC<MonthlyCardProps> = ({ month }) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const { data } = useQuery(["total", dayjs().month(month).date(1).format("YYYY-MM-DDTHH:mm")], getTotalAmount);
  const { data: categoryTotalData } = useQuery(
    ["categoryTotal", dayjs().month(month).date(1).format("YYYY-MM-DDTHH:mm")],
    getTotalAmountByCategory
  );
  const [date, setDate] = useState(dayjs().month(month).format("YYYY년 MM월"));
  const redirect = useRedirect();

  const handleClick = () => {
    const displayedFilters = {
      date_gte: true,
      date_lte: true,
    };
    const filter = {
      date_gte: dayjs().month(month).date(1).format("YYYY-MM-DD"),
      date_lte: dayjs().month(month).endOf("month").format("YYYY-MM-DD"),
    };

    document.location.href = `#/statement?displayedFilters=${encodeURIComponent(
      JSON.stringify(displayedFilters)
    )}&filter=${encodeURIComponent(JSON.stringify(filter))}&order=DESC&page=1&perPage=${isSmall ? 10 : 25}&sort=date`;
  };

  const boxClick = (type: number) => {
    const displayedFilters = {
      date_gte: true,
      date_lte: true,
    };
    const filter = {
      date_gte: dayjs().month(month).date(1).format("YYYY-MM-DD"),
      date_lte: dayjs().month(month).endOf("month").format("YYYY-MM-DD"),
      type,
    };

    document.location.href = `#/statement?displayedFilters=${encodeURIComponent(
      JSON.stringify(displayedFilters)
    )}&filter=${encodeURIComponent(JSON.stringify(filter))}&order=DESC&page=1&perPage=${isSmall ? 10 : 25}&sort=date`;
  };

  return (
    <Card className="z-10">
      <CardContent>
        <Box className="w-full text-xl font-bold cursor-pointer" onClick={handleClick}>
          {date}
        </Box>
        <Box className={"flex mt-2 z-20 cursor-pointer"} onClick={() => boxClick(1)}>
          <Typography className={"w-12"}>수입</Typography>
          <Box className={"w-full font-bold text-right"} style={{ color: CATEGORY_TYPE_COLOR[0] }}>
            {categoryTotalData ? new Intl.NumberFormat("ko-kr").format(categoryTotalData[0]) : 0}
          </Box>
        </Box>
        <Box className={"flex mt-1 z-20 cursor-pointer"} onClick={() => boxClick(2)}>
          <Typography className={"w-12"}>지출</Typography>
          <Box className={"w-full font-bold text-right"} style={{ color: CATEGORY_TYPE_COLOR[1] }}>
            {categoryTotalData ? new Intl.NumberFormat("ko-kr").format(categoryTotalData[1]) : 0}
          </Box>
        </Box>
        <Box className={"flex mt-1 z-20 cursor-pointer"} onClick={() => boxClick(3)}>
          <Typography className={"w-12"}>저축</Typography>
          <Box className={"w-full font-bold text-right"} style={{ color: CATEGORY_TYPE_COLOR[2] }}>
            {categoryTotalData
              ? new Intl.NumberFormat("ko-kr").format((categoryTotalData[2] - categoryTotalData[4]) * -1)
              : 0}
          </Box>
        </Box>
        <Box className="flex mt-1 cursor-pointer" onClick={handleClick}>
          <Box className={"w-12"}>할인</Box>
          <Box className={"w-full font-bold text-right"} style={{ color: CATEGORY_TYPE_COLOR[3] }}>
            {categoryTotalData ? new Intl.NumberFormat("ko-kr").format(categoryTotalData[3]) : 0}
          </Box>
        </Box>
        <Box className={"flex mt-1 cursor-pointer"} onClick={handleClick}>
          <Box className={"w-12"}>잔액</Box>
          <Box className={"w-full font-bold text-right text-lg"}>
            {data && categoryTotalData
              ? `${new Intl.NumberFormat("ko-kr").format(data)} (${new Intl.NumberFormat("ko-kr").format(
                  data + categoryTotalData[3]
                )})`
              : 0}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyCard;
