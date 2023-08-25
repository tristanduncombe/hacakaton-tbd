import React from "react";
import { Button } from "@mui/material";

import "./Button.css";

type CustomButtonProps = {
  text: string;
  icon?: JSX.Element;
};

export default function CustomButton({ text, icon }: CustomButtonProps) {
  return (
    <Button
      className="custom_btn"
      endIcon={icon ? <div className="btn_icon_container">{icon}</div> : null}
    >
      <span className="btn_text">{text}</span>
    </Button>
  );
}
