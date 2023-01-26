import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
       status: {
              danger: "#e53e3e",
       },
       palette: {
              primary: {
                     main: "#0971f1",
                     darker: "#053e85",
              },
              purple: {
                     main: "#892cdc",
                     contrastText: "#fff",
              },
              black: {
                     main: "#000000",
                     contrastText: "#fff",
              }
       },
});

export default muiTheme;
