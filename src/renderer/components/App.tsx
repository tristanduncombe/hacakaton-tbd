import React from "react";
import { CssBaseline, ThemeProvider, Container, Grid } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Pages/layout/Layout";
import { routes as appRoutes } from "./routes";
import { Titlebar } from "custom-electron-titlebar";

import "./App.css";

function App() {
  window.addEventListener("DOMContentLoaded", () => {
    // Title bar implementation
    new Titlebar({});
  });

  // define theme
  const theme = createTheme({
    typography: {
      fontFamily: `"Apple Color Emoji", sans-serif`,
    },
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#0989e3",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#1c1c1c",
        light: "#82e9de",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
  });

  // mock data
  const data = [
    {
      id: "1",
      name: "Tayla Ward",
      updatedDate: "25th Aug 2023",
      completion: "Completed",
    },
    {
      id: "2",
      name: "Tristan",
      updatedDate: "25th Aug 2023",
      completion: "Incomplete",
    },
    {
      id: "3",
      name: "Luke",
      updatedDate: "25th Aug 2023",
      completion: "Incomplete",
    },
    {
      id: "4",
      name: "JaeWon",
      updatedDate: "25th Aug 2023",
      completion: "Incomplete",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container className="top_60">
        <Grid container spacing={3}>
          <CssBaseline />
          <Router>
            <Layout>
              <div className="main-content .container_shade">
                <Routes>
                  {appRoutes.map((route) => (
                    <Route
                      key={route.key}
                      path={route.path}
                      element={<route.component data={data} />}
                    />
                  ))}
                </Routes>
              </div>
            </Layout>
          </Router>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
