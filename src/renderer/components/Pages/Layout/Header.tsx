import { AppBar, Toolbar, Divider, IconButton } from "@mui/material";
import React from "react";
import { FC, ReactElement } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackwardkIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const Header: FC = (): ReactElement => {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleForward() {
    navigate(1);
  }

  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: "#252525" }}>
        <Toolbar variant="dense">
          <IconButton sx={{ color: "white" }} onClick={() => navigate("/")}>
            <HomeIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <IconButton sx={{ color: "white" }} onClick={() => handleBack()}>
            <ArrowBackwardkIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ color: "white" }} onClick={() => handleForward()}>
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider />
    </React.Fragment>
  );
};

export default Header;
