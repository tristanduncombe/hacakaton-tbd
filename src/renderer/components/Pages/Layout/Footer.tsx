import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { FC, ReactElement } from "react";

const Footer: FC = (): ReactElement => {
    return (
      <React.Fragment>
        <Box
          sx={{
            backgroundColor: "#252525",
            margin: 0,
            padding: 2,
            color: "white",
          }}
        >
          <Divider />
          <Grid>
            <Grid item xs={12}>
              <Typography sx={{ marginBlock: "auto", marginTop: 1 }}>
                Made with Love ❤️
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                sx={{ marginBlock: 2, marginTop: 1 }}
              >
                By the Four Horsemen (Luke, Tayla, Jaewon, and Tristan)
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
};

export default Footer;
