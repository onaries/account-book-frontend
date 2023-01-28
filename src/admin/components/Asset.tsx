import React from "react";
import { ASSET_TYPE_OBJECT } from "../../consts";

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
} from "react-admin";

export const AssetList = () => (
  <List>
    <DatagridConfigurable rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="이름" />
      <SelectField source="type" choices={ASSET_TYPE_OBJECT} label="타입" />
      <NumberField source="amount" label="잔액" />
      <DateField source="createdAt" label="생성일" />
      <DateField source="updatedAt" label="수정일" />
    </DatagridConfigurable>
  </List>
);

export const AssetEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label="이름" />
      <SelectInput source="type" choices={ASSET_TYPE_OBJECT} optionValue="id" label="타입" />
      <NumberInput source="amount" label="잔액" />
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
        <NumberInput source="amount" label="잔액" />
        <TextInput source="description" multiline label="설명" />
      </SimpleForm>
    </Create>
  );
};
