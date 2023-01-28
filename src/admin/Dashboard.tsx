import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Paper, CardHeader, Box, Typography, useMediaQuery } from "@mui/material";
import { Title } from "react-admin";
import { useQuery } from "react-query";
import { getTotalAmount, getTotalAmountByCategory } from "./api/statement";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

const Dashboard = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const { data } = useQuery("total", getTotalAmount);
  const { data: categoryTotalData } = useQuery("categoryTotal", getTotalAmountByCategory);
  const [date, setDate] = useState(dayjs().format("YYYY년 MM월"));

  return (
    <div>
      <Grid container spacing={2} className="pt-4">
        <Grid item xs={isSmall ? 12 : 6}>
          <Card className="text-black">
            <CardContent>
              <Typography variant={"h5"}>{date}</Typography>
              <Box className={"flex mt-2"}>
                <Typography className={"w-12"}>수입</Typography>
                <NumericFormat
                  disabled
                  className={"font-bold text-right bg-white"}
                  value={categoryTotalData ? categoryTotalData[0] : 0}
                  thousandSeparator=","
                />
              </Box>
              <Box className={"flex mt-1"}>
                <Typography className={"w-12"}>지출</Typography>
                <NumericFormat
                  disabled
                  className={"font-bold text-right bg-white"}
                  value={categoryTotalData ? categoryTotalData[1] : 0}
                  thousandSeparator=","
                />
              </Box>
              <Box className={"flex mt-1"}>
                <Typography className={"w-12"}>저축</Typography>
                <NumericFormat
                  disabled
                  className={"font-bold text-right bg-white"}
                  value={categoryTotalData ? categoryTotalData[2] : 0}
                  thousandSeparator=","
                />
              </Box>
              <Box className={"flex mt-1"}>
                <Typography className={"w-12"}>월 잔액</Typography>
                <NumericFormat
                  disabled
                  className={"font-bold text-right bg-white"}
                  value={data}
                  thousandSeparator=","
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
