import React from "react";
import "./App.css";
import { Button } from "@mui/material";
import Home from "./components/home/home";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Apple Color Emoji", sans-serif`,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
