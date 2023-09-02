import React, { useEffect } from "react";

import { gradeGen } from "../../Common/dataGen";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import CustomButton from "../../Common/button/Button";
import ProjectCard from "../Project Card/ProjectCard";
import AddIcon from "@mui/icons-material/Add";
import { getFiles, getDocumentsPath, readFile } from "../../Common/common";

/**
 * Represents the home page of a project management application.
 * Displays a list of projects and allows the user to add new projects.
 */
export default function Home() {
  const path = getDocumentsPath() + "/Polocrosse-Draw-Generator/Projects";

  useEffect(() => {
    console.log(getFiles(path));
  }, [getFiles(path)]);

  const data = getFiles(path).map((file) => {
    return JSON.parse(readFile(path + `/${file}`));
  });

  console.log(data);

  const handleDeleteProject = (id: string) => {};
  const navigate = useNavigate();
  //gradeGen();

  /**
   * Navigates to the create project page when the "Add Project" button is clicked.
   */
  const handleAddProjectClick = () => {
    navigate("/createproject");
  };

  return (
    <Paper sx={{ padding: 4, marginBottom: 0 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        paddingBottom={2}
      >
        <Grid item>
          <Typography variant="h1">Projects:</Typography>
        </Grid>
        <Grid item>
          <div className="btn_container">
            <CustomButton
              text="Add Project"
              icon={<AddIcon />}
              onClick={handleAddProjectClick}
            />
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="home_grid">
        {data.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              No projects found
            </Typography>
          </Grid>
        ) : (
          data.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard
                data={project}
                onDelete={() => handleDeleteProject(project.id)}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Paper>
  );
}
