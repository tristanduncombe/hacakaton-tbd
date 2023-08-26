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
    name: string;
    created: number;
    updated: number;
    status: string;
    id: string;
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
          Name: {data.name}
        </Typography>
        <Typography variant="body2">
          Created: {new Date(data.created * 1000).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          Last Modified: {new Date(data.updated * 1000).toLocaleString()}
        </Typography>
        <Typography variant="body2">Status: {data.status}</Typography>
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
                  data.id,
              )
            }
          >
            Delete {data.name}
          </Button>
        </Typography>
      </Popover>
    </Card>
  );
}
