import React from "react";
import { Button } from "@mui/material";

import "./Button.css";

type CustomButtonProps = {
  text: string;
  icon?: JSX.Element;
  onClick?: () => void;
  negative?: boolean;
};

export default function CustomButton({
  text,
  icon,
  onClick,
  negative = false,
}: CustomButtonProps) {
  return (
    <Button
      className={`${negative ? "custom_negative_btn" : "custom_positive_btn "}`}
      endIcon={icon ? <div className="btn_icon_container">{icon}</div> : null}
      onClick={onClick}
    >
      <span className="btn_text">{text}</span>
    </Button>
  );
}
