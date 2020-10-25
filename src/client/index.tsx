import React from "react"
import ReactDOM from "react-dom"
import Main from "./components/Main"
import "./styles.scss"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "80d4ce",
      main: "#00a99d",
      contrastText: "#fff"
    },
    secondary: {
      main: "#1976d2"
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <CssBaseline />
    <Main />
  </ThemeProvider>,
  document.getElementById("index")
)
