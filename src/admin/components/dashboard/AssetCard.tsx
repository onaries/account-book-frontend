import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useQuery } from "react-query";
import { getTotalAsset } from "../../api/asset";
import { getTotalLoan } from "../../api/loan";

const AssetCard: React.FC = () => {
  const { data } = useQuery(["totalAsset"], getTotalAsset);
  const { data: loanData } = useQuery(["totalLoan"], getTotalLoan);

  const assetClick = () => {
    document.location.href = "#/asset";
  };

  const loanClick = () => {
    document.location.href = "#/loan";
  };

  return (
    <Card>
      <CardContent>
        <Box className="w-full text-2xl font-bold">자산</Box>
        <Box className="flex justify-between pt-2 cursor-pointer" onClick={assetClick}>
          <Typography>자산 합계</Typography>
          <Box className={"font-bold text-lg bg-white"}>
            {data != null ? new Intl.NumberFormat("ko-kr").format(data) : 0}
          </Box>
        </Box>
        <Box className="flex justify-between pt-1 cursor-pointer" onClick={loanClick}>
          <Typography>대출 합계</Typography>
          <Box className={"font-bold text-lg bg-white"}>
            {loanData != null ? new Intl.NumberFormat("ko-kr").format(loanData) : 0}
          </Box>
        </Box>
        <Box className="flex justify-between pt-1 cursor-pointer" onClick={assetClick}>
          <Typography>총 자산</Typography>
          <Box className={"font-bold text-lg bg-white"}>
            {data != null && loanData ? new Intl.NumberFormat("ko-kr").format(data - loanData) : 0}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
