import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import CustomButton from "../../Common/button/Button";
import { useNavigate } from "react-router-dom";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

export default function CreateProject() {
  const [date, setDate] = useState();
  const [rows, setRows] = useState([{ rating: "", name: "" }]);
  const navigate = useNavigate();

  const addRow = () => {
    setRows([...rows, { rating: "", name: "" }]);
  };

  const handleChange = (event: any, index: any) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [name]: value };
    setRows(newRows);
  };

  const handleDelete = (index: any) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const nextPage = () => {
    navigate("/import");
  };

  const prevPage = () => {
    navigate("/");
  };

  function setValue(newValue: any): void {
    throw new Error("Function not implemented.");
  }

  // const inputStyling = {
  //   size
  // };

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        paddingBottom={2}
      >
        <Grid item>
          <Typography variant="h1"> New Project </Typography>
        </Grid>
      </Grid>
      <Box sx={{ width: "80%" }}>
        <Grid
          container
          alignItems={"center"}
          rowSpacing={1}
          sx={{ backgroundColor: "white" }}
        >
          <Grid item xs={6} sx={{ backgroundColor: "white" }}>
            <p>Competition Name</p>
          </Grid>
          <Grid item xs={6} sx={{ backgroundColor: "white" }}>
            <TextField
              id="outlined-basic"
              helperText="Please enter your project name"
              variant="outlined"
              color="secondary"
              focused
            />
          </Grid>

          <Grid item xs={6}>
            <p>Date of Event</p>
          </Grid>
          <Grid item xs={6}>
            <input type="date" onChange={(e: any) => setDate(e.target.value)} />
          </Grid>

          <Grid item xs={6}>
            <p>Field Information</p>
          </Grid>
          <Grid item xs={6}>
            <table>
              <thead>
                <tr>
                  <th>Field Rating</th>
                  <th>Field Name</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name="rating"
                        value={row.rating}
                        // style={inputStyling}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={row.name}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={addRow}>Add Row</button>
          </Grid>
        </Grid>
      </Box>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CustomButton text="Go Back" onClick={prevPage} negative />
        <CustomButton
          text="Continue"
          onClick={() => navigate("/createproject/import")}
        />
      </div>
    </React.Fragment>
  );
}