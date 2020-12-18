import React from "react"
import ReactDOM from "react-dom"
import Main from "./components/Main"
import "./styles.scss"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: amber
  }
});

ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <CssBaseline />
    <Main />
  </ThemeProvider>,
  document.getElementById("index")
)
