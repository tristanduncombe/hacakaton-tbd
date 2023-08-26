import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import CustomButton from "../button/Button";

export default function TeamSelection() {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ height: "100vh" }}
    >
      <Grid item>
        <Typography variant="h3">Team Selection</Typography>
      </Grid>
      <Grid item>
        <CustomButton
          text="Choose Team"
          onClick={() => navigate("/team_selection/choose_team")}
        />
      </Grid>
      <Grid item>
        <CustomButton
          text="Create Team"
          onClick={() => navigate("/team_selection/create_team")}
        />
      </Grid>
    </Grid>
  );
}
