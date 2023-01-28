import React from "react";

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
  SortButton,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";

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

export const LoanList = () => (
  <List actions={<LoanListActions />}>
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
  </List>
);

export const LoanEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" label="이름" />
      <NumberInput source="principal" label="원금" />
      <NumberInput source="interestRate" label="이자율(%)" />
      <NumberInput source="totalPeriod" label="총 기간(개월)" />
      <NumberInput source="currentPeriod" label="현재 기간(개월)" />
      <NumberInput source="amount" label="잔액" />
      <TextInput source="description" label="설명" />
      <DateInput source="createdAt" label="생성일" disabled />
      <DateInput source="updatedAt" label="수정일" disabled />
    </SimpleForm>
  </Edit>
);

export const LoanCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" label="이름" />
        <NumberInput source="principal" label="원금" />
        <NumberInput source="interestRate" label="이자율(%)" />
        <NumberInput source="totalPeriod" label="총 기간(개월)" />
        <NumberInput source="currentPeriod" label="현재 기간(개월)" />
        <NumberInput source="amount" label="잔액" />
        <TextInput source="description" multiline label="설명" />
      </SimpleForm>
    </Create>
  );
};
