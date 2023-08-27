import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Popover,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { deleteFile, getDocumentsPath } from "../../Common/common";

type ProjectCardProps = {
  data: {
    "project-info": {
      name: string;
      created: number;
      updated: number;
      status: string;
      id: string;
    };
  };
  onDelete: () => void;
};

export default function ProjectCard({ data, onDelete }: ProjectCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    onDelete();
    handleSettingsClose();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Name: {data["project-info"].name}
        </Typography>
        <Typography variant="body2">
          Created: {new Date(data["project-info"].created).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          Last Modified:{" "}
          {new Date(data["project-info"].updated).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          Status: {data["project-info"].status}
        </Typography>
      </CardContent>
      <IconButton aria-label="settings" onClick={handleSettingsClick}>
        <SettingsIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Typography variant="body2" sx={{ p: 2 }} onClick={handleDeleteClick}>
          <Button
            onClick={() =>
              deleteFile(
                getDocumentsPath() +
                  "/Polocrosse-Draw-Generator/Projects" +
                  "/" +
                  data["project-info"].id,
              )
            }
          >
            Delete {data["project-info"].name}
          </Button>
        </Typography>
      </Popover>
    </Card>
  );
}
