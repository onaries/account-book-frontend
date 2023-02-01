import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Paper, CardHeader, Box, Typography, useMediaQuery } from "@mui/material";
import { Title } from "react-admin";
import { useQuery } from "react-query";
import { getTotalAmount, getTotalAmountByCategory } from "./api/statement";
import dayjs from "dayjs";
import MonthlyCard from "./components/dashboard/MonthlyCard";
import AssetCard from "./components/dashboard/AssetCard";

const Dashboard = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const { data } = useQuery("total", getTotalAmount);
  const { data: categoryTotalData } = useQuery("categoryTotal", getTotalAmountByCategory);
  const [date, setDate] = useState(dayjs().format("YYYY년 MM월"));

  return (
    <div>
      <Grid container spacing={2} className="pt-4">
        <Grid item xs={isSmall ? 12 : 6}>
          <AssetCard />
        </Grid>

        <Grid item xs={12}>
          <Box className="p-4">
            <Typography variant="h6" className="">
              최근 4개월 통계
            </Typography>
          </Box>
        </Grid>

        {[0, 1, 2, 3].map((month) => (
          <Grid item xs={isSmall ? 12 : 6}>
            <MonthlyCard month={dayjs().month() - month} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
