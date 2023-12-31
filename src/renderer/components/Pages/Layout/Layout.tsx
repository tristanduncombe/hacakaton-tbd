import React, { FC, ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          backgroundColor: "#F5F5FA",
          width: "100%",
          marginTop: 4,
          marginBottom: 0,
          minHeight: "88.3vh",
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
