import {
  BooleanInput,
  Button,
  Create,
  CreateButton,
  Datagrid,
  DatagridConfigurable,
  DateField,
  DateInput,
  DateTimeInput,
  Edit,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  NumberInput,
  ReferenceInput,
  SelectColumnsButton,
  SelectInput,
  ShowButton,
  SimpleForm,
  SimpleList,
  SortButton,
  TextField,
  TextInput,
  TopToolbar,
  useEditContext,
} from "react-admin";
import { Box, Paper, useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import { CATEGORY_TYPE, CATEGORY_TYPE_OBJECT } from "../../consts";
import { CustomTypeField } from "../fields/CustomTypeField";
import {
  Dialog,
  DialogTitle,
  Button as MuiButton,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { postAlertStatement } from "../api/statement";

const statementFilters = [
  <SelectInput source={"type"} choices={CATEGORY_TYPE_OBJECT} label={"타입"} alwaysOn />,
  <DateInput source="date_gte" label={"날짜보다 큼"} />,
  <DateInput source="date_lte" label={"날짜보다 작음"} />,
];

const StatementListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    <SortButton fields={["id", "date", "amount"]} />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const StatementList = (props: any) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  return (
    <List
      filters={statementFilters}
      actions={<StatementListActions />}
      sort={{ field: "date", order: "DESC" }}
      perPage={isSmall ? 10 : 25}
      {...props}
    >
      {isSmall ? (
        <>
          <SimpleList
            primaryText={(record) => `${record.name}: ${new Intl.NumberFormat("ko-kr").format(record.amount)}원`}
            secondaryText={(record) =>
              ` ${CATEGORY_TYPE[record.category.type - 1]}/${record.category.name} (할인금액: ${new Intl.NumberFormat(
                "ko-kr"
              ).format(record.discount)}원)`
            }
            tertiaryText={(record) => `${dayjs(record.date).format("YYYY-MM-DD HH:mm")}`}
          />
        </>
      ) : (
        <DatagridConfigurable rowClick="edit">
          <TextField source="id" />
          <CustomTypeField source="category.type" label={"타입"} />
          <NumberField source="category.name" label={"분류"} />
          <TextField source="name" label={"내용"} />
          <NumberField source="amount" label={"금액"} />
          <NumberField source="discount" label={"할인금액"} />
          <NumberField source="accountCard.name" label={"계좌/카드"} />
          <DateField source="date" label={"날짜"} />
          <DateField source="createdAt" label={"생성일"} />
          <DateField source="updatedAt" label={"수정일"} />
        </DatagridConfigurable>
      )}
    </List>
  );
};

const StatementEditActions = () => {
  const { record } = useEditContext();
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const postAlert = useMutation(postAlertStatement, {
    mutationKey: "postAlert",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const alertClick = () => {
    setOpen(true);
  };

  const sendClick = () => {
    postAlert.mutate({ mutationKey: { id: record.id } });

    handleClose();
  };

  return (
    <TopToolbar>
      <Button label={"알림"} onClick={alertClick} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText>정말로 알림을 보내시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleClose}>닫기</MuiButton>
          <MuiButton onClick={sendClick}>보내기</MuiButton>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose} message="완료되었습니다" />
    </TopToolbar>
  );
};

export const StatementEdit = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const { record } = useEditContext();

  const postAlert = useMutation(postAlertStatement, {
    mutationKey: "postAlert",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const alertClick = () => {
    setOpen(true);
  };

  const sendClick = () => {
    postAlert.mutate({ mutationKey: { id: record.id } });
    handleClose();
  };

  const optionRenderer = (choice: any) => `${choice.mainCategory.name}-${choice.name}`;

  return (
    <Edit
      actions={<StatementEditActions />}
      transform={(data: any) => {
        const date = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss");

        return {
          ...data,
          category: data.category.id,
          accountCard: data.accountCard.id,
          date,
        };
      }}
    >
      <SimpleForm>
        {isSmall && (
          <Box>
            <MuiButton onClick={alertClick}>알림 보내기</MuiButton>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>알림</DialogTitle>
              <DialogContent>
                <DialogContentText>정말로 알림을 보내시겠습니까?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <MuiButton onClick={handleClose}>닫기</MuiButton>
                <MuiButton onClick={sendClick}>보내기</MuiButton>
              </DialogActions>
            </Dialog>
            <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose} message="완료되었습니다" />
          </Box>
        )}
        <TextInput source="id" disabled />
        <ReferenceInput source={"category.id"} reference={"category/all"}>
          <SelectInput optionText={optionRenderer} optionValue={"id"} label={"분류"} />
        </ReferenceInput>
        <TextInput source="name" label={"이름"} />
        <NumberInput source="amount" label={"금액"} />
        <NumberInput source="discount" label={"할인금액"} />
        <ReferenceInput source={"accountCard.id"} reference={"account-card/all"}>
          <SelectInput optionText={"name"} optionValue={"id"} label={"계좌/카드"} />
        </ReferenceInput>
        <DateTimeInput source="date" label={"날짜"} />
        <TextInput source="description" label="메모" multiline />
        <DateTimeInput source="createdAt" disabled label={"생성일"} />
        <DateTimeInput source="updatedAt" disabled label={"수정일"} />
      </SimpleForm>
    </Edit>
  );
};

export const StatementCreate = () => {
  const optionRenderer = (choice: any) => `${choice.mainCategory.name}-${choice.name}`;

  return (
    <Create
      transform={(data: any) => {
        const date = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss");

        return {
          ...data,
          category: data.category.id,
          accountCard: data.accountCard.id,
          date,
        };
      }}
    >
      <SimpleForm>
        <ReferenceInput source={"category.id"} reference={"category/all"}>
          <SelectInput optionText={optionRenderer} optionValue={"id"} label={"분류"} />
        </ReferenceInput>
        <TextInput source="name" label={"내역"} />
        <NumberInput source="amount" label={"금액"} />
        <NumberInput source="discount" label={"할인금액"} />
        <ReferenceInput source={"accountCard.id"} reference={"account-card/all"}>
          <SelectInput optionText={"name"} optionValue={"id"} label={"계좌/카드"} />
        </ReferenceInput>
        <TextInput source="description" label="메모" multiline />
        <DateTimeInput source="date" label={"날짜"} />
        <BooleanInput source={"is_alert"} label={"알림 여부"} />
      </SimpleForm>
    </Create>
  );
};
