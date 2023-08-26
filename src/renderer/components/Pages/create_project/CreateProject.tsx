import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { Fab, TextField } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

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

  // function setValue(newValue: any): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <React.Fragment>
      <div> Australian Polo X Association </div>
      <h1> New Project </h1>
      <Box sx={{ width: "80%" }}>
        <Grid container rowSpacing={1} sx={{ backgroundColor: "white" }}>
          <Grid item xs={6} sx={{ backgroundColor: "white" }}>
            <p>Competition Name</p>
          </Grid>
          <Grid item xs={6} sx={{ backgroundColor: "white" }}>
            <TextField
              id="outlined-basic"
              helperText="Please enter your name"
              variant="outlined"
              color="secondary"
              focused
            />
          </Grid>

          <Grid item xs={6} sx={{ backgroundColor: "white" }}>
            <p>Date of Event</p>
          </Grid>
          <Grid item xs={6} sx={{ backgroundColor: "white" }}>
            <input type="date" onChange={(e: any) => setDate(e.target.value)} />
          </Grid>

          <Grid item xs={6} sx={{ backgroundColor: "white" }}>
            <p>Field Information</p>
          </Grid>
          <Grid item xs={6} sx={{ backgroundColor: "white" }}>
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

      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab variant="extended" size="small" color="primary">
          <NavigationIcon sx={{ mr: 1 }} />
          Continue
        </Fab>
      </Box>
    </React.Fragment>
  );
}
function useReactTable(arg0: any, addRow: any, arg2: () => void) {
  throw new Error("Function not implemented.");
}

function getCoreRowModel() {
  throw new Error("Function not implemented.");
}
