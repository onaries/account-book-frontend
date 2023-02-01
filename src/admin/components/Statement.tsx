import {
  BooleanInput,
  Button,
  Create,
  CreateButton,
  DatagridConfigurable,
  DateField,
  DateInput,
  DateTimeInput,
  Edit,
  ExportButton,
  FilterButton,
  List,
  NumberField,
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
  useCreateController,
  useEditContext,
  useEditController,
  useListController,
  useListFilterContext,
} from "react-admin";
import { Box, Divider, Paper, Typography, useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import { CATEGORY_TYPE, CATEGORY_TYPE_OBJECT, CATEGORY_TYPE_COLOR } from "../../consts";
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
import { postAlertStatement, getStatementSummary } from "../api/statement";
import AmountField from "../fields/AmountField";
import AmountInput from "../inputs/AmountInput";

const optionRenderer = (choice: any) => `${choice.mainCategory.name}/${choice.name}`;

const statementFilters = [
  <SelectInput source={"type"} choices={CATEGORY_TYPE_OBJECT} optionValue="id" label={"타입"} alwaysOn />,
  <ReferenceInput source={"category_id"} reference={"category/all"} label="분류">
    <SelectInput optionText={optionRenderer} optionValue={"id"} label={"분류"} />
  </ReferenceInput>,
  <ReferenceInput source="main_category_id" reference={"main-category/all"} label="대분류">
    <SelectInput optionText="name" optionValue="id" label={"대분류"} />
  </ReferenceInput>,
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

  const listContext = useListController();

  const { data } = useQuery(
    [
      "summary",
      listContext.page,
      listContext.perPage,
      listContext.filterValues.date_gte,
      listContext.filterValues.date_lte,
      listContext.filterValues.type,
      listContext.filterValues.category_id,
      listContext.filterValues.main_category_id,
    ],
    getStatementSummary
  );

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
            tertiaryText={(record) => (
              <Typography className="text-black">{dayjs(record.date).format("YYYY-MM-DD HH:mm")}</Typography>
            )}
            rowStyle={(record) => ({
              color: CATEGORY_TYPE_COLOR[record.category.type - 1],
            })}
          />
          <Divider />
          <Box className="p-2">
            <Typography>
              [페이지 합계]
              {data &&
                ` 금액: ${data.pageAmount.toLocaleString("ko-KR")}, 할인: ${data.pageDiscount.toLocaleString("ko-KR")}`}
            </Typography>
          </Box>
          <Box className="p-2">
            <Typography>
              [전체 합계]
              {data &&
                ` 금액: ${data.totalAmount.toLocaleString("ko-KR")}, 할인: ${data.totalDiscount.toLocaleString(
                  "ko-KR"
                )}`}
            </Typography>
          </Box>
          <Divider />
        </>
      ) : (
        <>
          <DatagridConfigurable rowClick="edit">
            <TextField source="id" />
            <CustomTypeField source="category.type" label={"타입"} />
            <NumberField source="category.name" label={"분류"} />
            <TextField source="name" label={"내용"} />
            <AmountField source="amount" label={"금액"} />
            <NumberField source="discount" label={"할인금액"} />
            <NumberField source="saving" label="저축금액" />
            <NumberField source="accountCard.name" label={"계좌/카드"} />
            <DateField source="date" label={"날짜"} />
            <DateField source="createdAt" label={"생성일"} />
            <DateField source="updatedAt" label={"수정일"} />
          </DatagridConfigurable>
          <Box className="p-2">
            <Typography>
              [페이지 합계]
              {data &&
                ` 금액: ${data.pageAmount.toLocaleString("ko-KR")}, 할인: ${data.pageDiscount.toLocaleString("ko-KR")}`}
            </Typography>
          </Box>
          <Box className="p-2">
            <Typography>
              [전체 합계]
              {data &&
                ` 금액: ${data.totalAmount.toLocaleString("ko-KR")}, 할인: ${data.totalDiscount.toLocaleString(
                  "ko-KR"
                )}`}
            </Typography>
          </Box>
        </>
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

export const StatementEdit = (props: any) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const { record } = useEditController();

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
        <TextInput source="name" label={"이름"} className="w-full sm:w-80 md:w-80" />
        <AmountInput
          source="amount"
          label={"금액"}
          parse={(value) => {
            if (value < 0) {
              return value * -1;
            }
            return value;
          }}
          format={(value) => {
            if (value < 0) {
              return value * -1;
            }
            return value;
          }}
        />
        <AmountInput source="discount" label={"할인금액"} />
        <AmountInput source="saving" label="저축금액" />
        <ReferenceInput source={"accountCard.id"} reference={"account-card/all"}>
          <SelectInput optionText={"name"} optionValue={"id"} label={"계좌/카드"} />
        </ReferenceInput>
        <DateTimeInput source="date" label={"날짜"} />
        <TextInput source="description" label="메모" multiline className="w-full sm:w-80 md:w-80" />
        <DateTimeInput source="createdAt" disabled label={"생성일"} />
        <DateTimeInput source="updatedAt" disabled label={"수정일"} />
      </SimpleForm>
    </Edit>
  );
};

export const StatementCreate = () => {
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
        <AmountInput source="amount" label="금액" />
        <AmountInput source="discount" label={"할인금액"} />
        <AmountInput source="saving" label="저축금액" />
        <ReferenceInput source={"accountCard.id"} reference={"account-card/all"}>
          <SelectInput optionText={"name"} optionValue={"id"} label={"계좌/카드"} />
        </ReferenceInput>
        <TextInput source="description" label="메모" multiline />
        <DateTimeInput source="date" label={"날짜"} />
        <BooleanInput source="isAlert" label={"알림 여부"} />
      </SimpleForm>
    </Create>
  );
};
