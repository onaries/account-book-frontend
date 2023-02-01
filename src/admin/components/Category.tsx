import {
  Datagrid,
  List,
  NumberField,
  TextField,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  Create,
  SelectField,
} from "react-admin";
import CustomPagination from "../fields/CustomPagination";
import { CATEGORY_TYPE_OBJECT } from "../../consts";
export const CategoryList = () => (
  <List pagination={<CustomPagination />} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <NumberField source="mainCategory.name" label={"대분류"} />
      <TextField source="name" label={"이름"} />
      <SelectField source="type" choices={CATEGORY_TYPE_OBJECT} label={"타입"} />
    </Datagrid>
  </List>
);

const TypeChoice = [
  { id: 1, name: "수입" },
  { id: 2, name: "지출" },
  { id: 3, name: "저축" },
];

export const CategoryEdit = () => (
  <Edit transform={(data) => ({ ...data, mainCategory: data.mainCategory.id })}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="mainCategory.id" reference={"main-category/all"}>
        <SelectInput optionText="name" optionValue="id" label={"대분류"} />
      </ReferenceInput>
      <TextInput source="name" label={"이름"} />
      <SelectInput source="type" choices={TypeChoice} optionValue={"id"} label={"타입"} />
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = () => {
  return (
    <Create
      transform={(data: any) => ({
        ...data,
        mainCategory: data.mainCategory.id,
      })}
    >
      <SimpleForm>
        <ReferenceInput source="mainCategory.id" reference={"main-category/all"}>
          <SelectInput optionText="name" optionValue="id" label={"대분류"} />
        </ReferenceInput>
        <TextInput source="name" label={"이름"} />
        <SelectInput source="type" choices={TypeChoice} optionValue={"id"} label={"타입"} />
      </SimpleForm>
    </Create>
  );
};
