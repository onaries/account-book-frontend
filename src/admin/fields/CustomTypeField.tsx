import { TextFieldProps, useRecordContext } from "react-admin";
import React from "react";
import { CATEGORY_TYPE } from "../../consts";

export const CustomTypeField: React.FC<TextFieldProps> = (props) => {
  const record = useRecordContext(props);

  return record ? <span>{CATEGORY_TYPE[record.category.type - 1]}</span> : null;
};
