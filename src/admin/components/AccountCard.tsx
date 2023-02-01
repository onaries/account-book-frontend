import { useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  DateTimeInput,
  Create,
  SelectInput,
  TopToolbar,
  SelectColumnsButton,
  FilterButton,
  CreateButton,
  ExportButton,
  DatagridConfigurable,
  SimpleList,
} from "react-admin";
import { ACCOUNT_CARD_TYPE_OBJECT, ACCOUNT_CARD_TYPE } from "../../consts";
import AmountInput from "../inputs/AmountInput";

const AccountCardListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const AccountCardList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  return (
    <List actions={<AccountCardListActions />} perPage={isSmall ? 15 : 25}>
      {isSmall ? (
        <SimpleList
          primaryText={(record: any) => `${record.name}: ${new Intl.NumberFormat("ko-KR").format(record.amount)}원`}
          secondaryText={(record: any) => ACCOUNT_CARD_TYPE[record.type - 1]}
          tertiaryText={(record: any) =>
            `${record.updatedAt ? dayjs(record.updatedAt).format("YYYY-MM-DD HH:mm") : "업데이트 정보 없음"}`
          }
        />
      ) : (
        <DatagridConfigurable rowClick="edit">
          <TextField source="id" />
          <TextField source="name" label={"이름"} />
          <NumberField source="type" label={"타입"} />
          <NumberField source="amount" label={"금액"} />
          <DateField source="createdAt" label={"생성일"} />
          <DateField source="updatedAt" showTime label={"수정일"} />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export const AccountCardEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label={"이름"} className="w-full sm:w-80 md:w-80" />
      <SelectInput source={"type"} choices={ACCOUNT_CARD_TYPE_OBJECT} label={"타입"} />
      <AmountInput source="amount" label={"금액"} />
      <DateTimeInput source="createdAt" label={"생성일"} disabled />
      <DateTimeInput source="updatedAt" label={"수정일"} disabled />
    </SimpleForm>
  </Edit>
);

export const AccountCardCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label={"이름"} className="w-full sm:w-80 md:w-80" />
      <SelectInput source={"type"} choices={ACCOUNT_CARD_TYPE_OBJECT} label={"타입"} />
      <AmountInput source="amount" label={"금액"} />
    </SimpleForm>
  </Create>
);
