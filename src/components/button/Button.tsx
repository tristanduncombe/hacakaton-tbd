import React from "react";
import { Button } from "@mui/material";

import "./Button.css";

type CustomButtonProps = {
  text: string;
  icon?: JSX.Element;
  onClick?: () => void;
};

export default function CustomButton({
  text,
  icon,
  onClick,
}: CustomButtonProps) {
  return (
    <Button
      className={`custom_positive_btn ${
        text === "Go Back" ? "custom_negative_btn" : ""
      }`}
      endIcon={icon ? <div className="btn_icon_container">{icon}</div> : null}
      onClick={onClick}
    >
      <span className="btn_text">{text}</span>
    </Button>
  );
}
