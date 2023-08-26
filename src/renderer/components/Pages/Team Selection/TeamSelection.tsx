import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import project from "../../../components/Common/test/testProject.json";

interface Team {
  "Team Club": string;
  "Team Name": string;
  Contact: string;
  Phone: string;
  Data: {
    "Mem No": string;
    Name: string;
    Pts: string;
    Club: string;
    Category: string;
    Gender: string;
  }[];
  "Team Total": string;
}

export default function TeamSelection() {
  const [teamCategory, setTeamCategory] = useState("Adult");
  const [teamType, setTeamType] = useState("Mixed");
  const [isSticky, setIsSticky] = useState(false);

  const teams = project.data.teams.teams.filter(
    (team) =>
      project.data.teams["Team Category"] === teamCategory &&
      project.data.teams["Team Type"] === teamType,
  );

  useEffect(() => {
    const handleScroll = () => {
      const projectTitle = document.getElementById("project-title");
      if (projectTitle) {
        const projectTitlePosition =
          projectTitle.getBoundingClientRect().bottom;
        setIsSticky(window.scrollY >= projectTitlePosition);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar position={isSticky ? "fixed" : "static"}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Team Selection
          </Typography>
          <IconButton color="inherit">
            <SaveIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isSticky && <Toolbar />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mt: 2 }}>
            {project["File Info"]["Project Name"]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ marginTop: "16px" }}>
            <Select
              value={teamCategory}
              onChange={(e) => setTeamCategory(e.target.value)}
            >
              <MenuItem value="Adult">Adult</MenuItem>
              <MenuItem value="Junior">Junior</MenuItem>
            </Select>
            <Select
              value={teamType}
              onChange={(e) => setTeamType(e.target.value)}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Mixed">Mixed</MenuItem>
              <MenuItem value="Womens">Womens</MenuItem>
            </Select>
          </div>
        </Grid>
        {/* {teams.map((team) => (
          <Grid item xs={12} key={team["Team Name"]}>
            <div style={{ marginTop: "16px" }}>
              <Typography variant="h6">{team["Team Name"]}</Typography>
              <Table sx={{ bgcolor: "#7EC8E3" }}>
                <TableHead sx={{ bgcolor: "#E57F84" }}>
                  <TableRow>
                    <TableCell>Mem No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Pts</TableCell>
                    <TableCell>Club</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {team.Data &&
                    team.Data.map((member) => (
                      <TableRow key={member["Mem No"]}>
                        <TableCell>{member["Mem No"]}</TableCell>
                        <TableCell>{member.Name}</TableCell>
                        <TableCell>{member.Pts}</TableCell>
                        <TableCell>{member.Club}</TableCell>
                        <TableCell>{member.Category}</TableCell>
                        <TableCell>{member.Gender}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </Grid> */}
        {/* ))} */}
      </Grid>
    </>
  );
}
