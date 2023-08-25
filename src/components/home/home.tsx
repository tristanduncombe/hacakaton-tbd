import React from "react";
import { Grid, Typography } from "@mui/material";
import CustomButton from "../button/Button";
import ProjectCard from "../project_card/ProjectCard";

import "./Home.css";

type ProjectData = {
  name: string;
  updatedDate: string;
  completion: string;
};

type HomeProps = {
  data: ProjectData[];
};

export default function Home() {
  // export default function Home({ data }: HomeProps) {
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className="home_title"
      >
        <Grid item>
          <Typography variant="h5">Projects:</Typography>
        </Grid>
        <Grid item>
          <CustomButton text="Add Project" />
        </Grid>
      </Grid>

      <Grid container spacing={2} className="home_grid">
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            No projects found
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ProjectCard />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ProjectCard />
        </Grid>
      </Grid>

      {/* <Grid container spacing={2} className="home_grid">
        {data.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              No projects found
            </Typography>
          </Grid>
        ) : (
          data.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProjectCard data={project} />
            </Grid>
          ))
        )}
      </Grid> */}
    </>
  );
}
