import React from "react";
import { NumberInput, NumberInputProps } from "react-admin";
import { useWatch } from "react-hook-form";
import { Box } from "@mui/material";
import { numberToKorean } from "../utils";

const AmountInput: React.FC<NumberInputProps> = (props) => {
  const watchValue = useWatch({ name: props.source });

  return (
    <Box className="flex justify-between">
      <NumberInput {...props} />
      <Box className="p-2 text-lg">{numberToKorean(watchValue < 0 ? -watchValue : watchValue)}원</Box>
    </Box>
  );
};

export default AmountInput;
