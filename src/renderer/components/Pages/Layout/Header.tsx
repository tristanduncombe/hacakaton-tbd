import { Card, Divider, Typography } from "@mui/material";
import React from "react";
import { FC, ReactElement } from "react";

const Header: FC = (): ReactElement => {
    return (
        <React.Fragment>
            <Typography variant="h5">Polocross Draw Generator</Typography>
            <Divider />
        </React.Fragment>
    );
};

export default Header;
