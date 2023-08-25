import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import "./ProjectCard.css";

type ProjectCardProps = {
  data: {
    name: string;
    updatedDate: string;
    completion: string;
  };
};

export default function ProjectCard() {
  // export default function ProjectCard({ data }: ProjectCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Name: Tayla Ward
        </Typography>
        {/* <Typography variant="h5" component="div">
          Name: {data.name}
        </Typography> */}
        <Typography variant="body2">Date: 25th Aug 2023</Typography>
        <Typography variant="body2">Status: Incomplete</Typography>
        {/* <Typography variant="body2">Date: {data.updatedDate}</Typography>
        <Typography variant="body2">Status: {data.completion}</Typography> */}
      </CardContent>
      <IconButton
        aria-label="settings"
        onClick={() => {
          // handle click event to pop up new card to modify or delete the card
        }}
      >
        <SettingsIcon />
      </IconButton>
    </Card>
  );
}
