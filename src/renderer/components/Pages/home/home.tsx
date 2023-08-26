import React from "react";

import { gradeGen } from "../../Common/dataGen";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import CustomButton from "../../Common/button/Button";
import ProjectCard from "../Project Card/ProjectCard";
import AddIcon from "@mui/icons-material/Add";

export type HomeProps = {
  data: ProjectData[];
};

type ProjectData = {
  id: string;
  name: string;
  updatedDate: string;
  completion: string;
};

export default function Home({ data }: HomeProps) {
  // const styling = {
  //   topPadding = "16px",
  // };

  const handleDeleteProject = (id: string) => {};
  const navigate = useNavigate();
  //gradeGen();

  const handleAddProjectClick = () => {
    navigate("/createproject");
  };

  return (
    <>
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
    </>
  );
}
