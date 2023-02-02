import React from "react";
import { useMediaQuery } from "@mui/material";

import {
  Create,
  CreateButton,
  Datagrid,
  DatagridConfigurable,
  DateField,
  DateInput,
  Edit,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  NumberInput,
  SelectColumnsButton,
  SimpleForm,
  SimpleList,
  SortButton,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import dayjs from "dayjs";
import AmountInput from "../inputs/AmountInput";

const loanFilters = [<TextInput source="name" label="이름" />];

const LoanListActions = () => {
  return (
    <TopToolbar>
      <SelectColumnsButton />
      {/* <FilterButton filters={loanFilters} /> */}
      <SortButton fields={["id", "principal", "amount"]} />
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );
};

export const LoanList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  return (
    <List actions={<LoanListActions />}>
      {isSmall ? (
        <SimpleList
          primaryText={(record: any) => `${record.name}`}
          secondaryText={(record: any) =>
            `[잔액] ${new Intl.NumberFormat("ko-kr").format(record.amount)} / [원금] ${new Intl.NumberFormat(
              "ko-kr"
            ).format(record.principal)} `
          }
          tertiaryText={(record: any) => `${dayjs(record.updatedAt).format("YYYY-MM-DD HH:mm")}`}
        />
      ) : (
        <DatagridConfigurable rowClick="edit">
          <TextField source="id" />
          <TextField source="name" label="이름" />
          <NumberField source="principal" label="원금" />
          <NumberField source="interestRate" label="이자율(%)" />
          <NumberField source="totalPeriod" label="총 기간(개월)" />
          <NumberField source="currentPeriod" label="현재 기간(개월)" />
          <NumberField source="amount" label="잔액" />
          <TextField source="description" label="설명" />
          <DateField source="createdAt" label="생성일" />
          <DateField source="updatedAt" label="수정일" />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export const LoanEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" label="이름" className="w-full sm:w-80 md:w-80" />
      <AmountInput source="principal" label="원금" />
      <NumberInput source="interestRate" label="이자율(%)" />
      <NumberInput source="totalPeriod" label="총 기간(개월)" />
      <NumberInput source="currentPeriod" label="현재 기간(개월)" />
      <AmountInput source="amount" label="잔액" />
      <TextInput source="description" label="설명" multiline className="w-full sm:w-80 md:w-80" />
      <DateInput source="createdAt" label="생성일" disabled />
      <DateInput source="updatedAt" label="수정일" disabled />
    </SimpleForm>
  </Edit>
);

export const LoanCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" label="이름" className="w-full sm:w-80 md:w-80" />
        <AmountInput source="principal" label="원금" />
        <NumberInput source="interestRate" label="이자율(%)" />
        <NumberInput source="totalPeriod" label="총 기간(개월)" />
        <NumberInput source="currentPeriod" label="현재 기간(개월)" />
        <AmountInput source="amount" label="잔액" className="w-full sm:w-80 md:w-80" />
        <TextInput source="description" multiline label="설명" />
      </SimpleForm>
    </Create>
  );
};
