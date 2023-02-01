import React from "react";
import { ASSET_TYPE, ASSET_TYPE_OBJECT } from "../../consts";
import { useMediaQuery } from "@mui/material";

import {
  DatagridConfigurable,
  DateField,
  List,
  TextField,
  NumberField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  Create,
  SelectInput,
  SelectField,
  DateTimeInput,
  SimpleList,
  TopToolbar,
  CreateButton,
  ExportButton,
  SelectColumnsButton,
  SortButton,
} from "react-admin";
import dayjs from "dayjs";
import AmountInput from "../inputs/AmountInput";

const AssetListActions = () => {
  return (
    <TopToolbar>
      <SelectColumnsButton />
      <SortButton fields={["id", "amount", "updatedAt"]} />
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );
};

export const AssetList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  return (
    <List actions={<AssetListActions />}>
      {isSmall ? (
        <SimpleList
          primaryText={(record: any) => `[${ASSET_TYPE[record.type - 1]}] ${record.name}`}
          secondaryText={(record: any) => `${new Intl.NumberFormat("ko-kr").format(record.amount)}`}
          tertiaryText={(record: any) => `${dayjs(record.updatedAt).format("YYYY-MM-DD HH:mm")}`}
        />
      ) : (
        <DatagridConfigurable rowClick="edit">
          <TextField source="id" />
          <TextField source="name" label="이름" />
          <SelectField source="type" choices={ASSET_TYPE_OBJECT} label="타입" />
          <NumberField source="amount" label="잔액" />
          <DateField source="createdAt" label="생성일" />
          <DateField source="updatedAt" label="수정일" />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export const AssetEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label="이름" />
      <SelectInput source="type" choices={ASSET_TYPE_OBJECT} optionValue="id" label="타입" />
      <AmountInput source="amount" label="잔액" />
      <TextInput source="description" multiline label="설명" />
      <DateTimeInput disabled source="createdAt" label="생성일" />
      <DateTimeInput disabled source="updatedAt" label="수정일" />
    </SimpleForm>
  </Edit>
);

export const AssetCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" label="이름" />
        <SelectInput source="type" choices={ASSET_TYPE_OBJECT} optionValue={"id"} label="타입" />
        <AmountInput source="amount" label="잔액" />
        <TextInput source="description" multiline label="설명" />
      </SimpleForm>
    </Create>
  );
};
