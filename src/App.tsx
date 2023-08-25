import React from "react";
import { CssBaseline, ThemeProvider, Container, Grid } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import Layout from "./components/layout/Layout";

import "./App.css";

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <Container className="top_60">
        <Grid container spacing={3}>
          <CssBaseline />
          <Router>
            <Layout>
              <Routes>
                {appRoutes.map((route: any) => (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Routes>
            </Layout>
          </Router>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
