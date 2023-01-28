import React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, defaultTheme } from "react-admin";
import customProvider from "./provider/customProvider";
import { CategoryCreate, CategoryEdit, CategoryList } from "./components/Category";
import { AccountCardCreate, AccountCardEdit, AccountCardList } from "./components/AccountCard";
import { StatementCreate, StatementEdit, StatementList } from "./components/Statement";
import authProvider from "./provider/authProvider";
import { MainCategoryCreate, MainCategoryEdit, MainCategoryList } from "./components/MainCategory";
import Dashboard from "./Dashboard";
import { baseUrl } from "../consts";
import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";
import { LoanList, LoanEdit, LoanCreate } from "./components/Loan";
import { AssetList, AssetCreate, AssetEdit } from "./components/Asset";
import { i18nProvider } from "./provider/i18nProvider";

const dataProvider = customProvider(baseUrl);

const myTheme = createTheme({
  palette: {
    primary: green,
    secondary: {
      main: "#48BB78",
      light: "#68D391",
    },
  },
  typography: {
    fontFamily: ["SUITE", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Arial", "sans-serif"].join(","),
  },
  components: {
    //@ts-ignore
    RaAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#48BB78",
          color: "white",
        },
      },
    },
    RaSaveButton: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

// const myTheme = {
//   ...defaultTheme,
//   palette: {
//     background: {
//       default: "#fafafb",
//     },
//     secondary: {
//       light: "#68D391",
//       main: "#48BB78",
//       dark: "#22543D",
//       contrastText: "#fff",
//     },
//   },
//   typography: {
//     fontFamily: ["SUITE", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Arial", "sans-serif"].join(","),
//   },
//   components: {
//     ...defaultTheme.components,
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           color: "#22543D",
//         },
//       },
//     },
//     RaSaveButton: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#48BB78",
//           color: "white",
//         },
//       },
//     },
//     MuiSwitch: {
//       styleOverrides: {
//         checked: {
//           color: "#48BB78",
//         },
//       },
//     },
//   },
// };

const App = () => (
  <Admin
    title={"윰팡이네 가계부"}
    theme={myTheme}
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="category"
      list={CategoryList}
      edit={CategoryEdit}
      create={CategoryCreate}
      options={{ label: "분류" }}
    />
    <Resource
      name="main-category"
      list={MainCategoryList}
      edit={MainCategoryEdit}
      create={MainCategoryCreate}
      options={{ label: "대분류" }}
    />
    <Resource
      name={"account-card"}
      list={AccountCardList}
      edit={AccountCardEdit}
      create={AccountCardCreate}
      options={{ label: "계좌/카드" }}
    />
    <Resource name="asset" list={AssetList} edit={AssetEdit} create={AssetCreate} options={{ label: "자산" }} />
    <Resource name="loan" list={LoanList} edit={LoanEdit} create={LoanCreate} options={{ label: "대출" }} />
    <Resource
      name="statement"
      list={StatementList}
      edit={StatementEdit}
      create={StatementCreate}
      options={{ label: "내역" }}
    />
    {/*<Resource name="comments" list={ListGuesser} />*/}
  </Admin>
);

export default App;
