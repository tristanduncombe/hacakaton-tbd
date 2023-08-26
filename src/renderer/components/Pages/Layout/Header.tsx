import { Card, Divider, Typography } from "@mui/material";
import React from "react";
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Typography variant="h5" onClick={() => navigate("/")}>
        Polocross Draw Generator
      </Typography>
      <Divider />
    </React.Fragment>
  );
};

export default Header;
