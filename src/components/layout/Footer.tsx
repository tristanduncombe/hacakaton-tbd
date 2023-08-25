import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { FC, ReactElement } from "react";

const Footer: FC = (): ReactElement => {
    return (
        <React.Fragment>
            <Divider />
            <Box>
                <Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ marginBlock: "auto", marginTop: 1 }}>
                            Made with Love ❤️
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="caption"
                            sx={{ marginBlock: "auto", marginTop: 1 }}
                        >
                            By the Four Horsemen (Luke, Tayla, Jaewon, and
                            Tristan)
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
};

export default Footer;
