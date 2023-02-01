import React from "react";
import { NumberField, NumberFieldProps, useRecordContext } from "react-admin";
import { CATEGORY_TYPE_COLOR } from "../../consts";

const AmountField: React.FC<NumberFieldProps> = (props) => {
  const record = useRecordContext();

  return <NumberField sx={{ color: CATEGORY_TYPE_COLOR[record.category.type - 1] }} {...props} />;
};

export default AmountField;
