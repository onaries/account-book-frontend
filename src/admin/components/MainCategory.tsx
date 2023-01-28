import {
  Datagrid,
  List,
  NumberField,
  TextField,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  Create,
  TopToolbar,
  SelectColumnsButton,
  CreateButton,
  DatagridConfigurable,
  ExportButton,
} from "react-admin";

const MainCategoryActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const MainCategoryList = () => (
  <List actions={<MainCategoryActions />} perPage={25}>
    <DatagridConfigurable rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label={"이름"} />
      <NumberField source="weeklyLimit" label={"예산(주단위)"} locales={"ko-KR"} />
      <TextField source="createdAt" label={"생성일"} />
      <TextField source="updatedAt" label={"수정일"} />
    </DatagridConfigurable>
  </List>
);

export const MainCategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label={"이름"} />
      <NumberInput source="weeklyLimit" label={"예산(주단위)"} />
      <TextInput source="createdAt" disabled label={"생성일"} />
      <TextInput source="updatedAt" disabled label={"수정일"} />
    </SimpleForm>
  </Edit>
);

export const MainCategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label={"이름"} />
      <NumberInput source="weeklyLimit" label={"예산(주단위)"} />
    </SimpleForm>
  </Create>
);
