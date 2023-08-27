import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useRef, useState } from "react";
import { Alert, AlertTitle, Paper, TextField, Typography } from "@mui/material";
import CustomButton from "../../Common/button/Button";
import { useNavigate } from "react-router-dom";
import { formatRawData } from "./formatRaw";
import { read, utils } from "xlsx";
import { getDocumentsPath, saveFile } from "../../Common/common";

export default function CreateProject() {
  const [date, setDate] = useState();
  const [rows, setRows] = useState([{ rating: "", name: "" }]);
  const [projectName, setProjectName] = useState("");
  const [compName, setCompName] = useState("");
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

  const prevPage = () => {
    navigate("/");
  };

  function handleProjName(event: any) {
    setProjectName(event.target.value);
  }

  function handleCompName(event: any) {
    setCompName(event.target.value);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState("");
  let csvData: any = {};

  const projData = {
    "project-info": {
      name: projectName,
      id: projectName.replace(" ", "-") + ".json",
      description: null,
      created: Number(new Date()),
      updated: Number(new Date()),
      status: "Incomplete",
    },
    "competiton-info": {
      name: compName,
    },
    csvData,
  };

  function saveFinalData() {
    saveFile(
      getDocumentsPath() +
        "/Polocrosse-Draw-Generator/Projects/" +
        projData["project-info"]?.id,
      JSON.stringify(projData),
    );
  }

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];

    const fileName = file.name;
    const fileExtension = fileName.split(".").pop();
    const validExtensions = ["xls", "xlsx", "xlsm"];

    if (validExtensions.includes(fileExtension)) {
      // If the file is an excel file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const excelPages = [];
        const teamSheet = workbook.SheetNames[0];
        const playerSheet = workbook.SheetNames[1];
        const umpireSheet = workbook.SheetNames[4];
        excelPages.push(teamSheet, playerSheet, umpireSheet);
        const rawJsonObjects: { [page: string]: any } = {};

        excelPages.forEach((page) => {
          const worksheet = workbook.Sheets[page];
          const json = utils.sheet_to_json(worksheet);
          rawJsonObjects[page] = json;
        });

        const formattedData = formatRawData(rawJsonObjects);

        const project = {
          data: {
            teams: formattedData["Teams"],
            umpires: formattedData["Umpires"],
            fields: rows,
            "pool players": formattedData["Pool Players"],
          },
        };

        csvData = project;
      };
      reader.readAsArrayBuffer(file);

      setResult("success");
    } else {
      setResult("error");
    }
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
          <Typography variant="h1"> Create Project </Typography>
        </Grid>
      </Grid>
      <Box sx={{ width: "80%" }}>
        <Grid
          container
          alignItems={"center"}
          rowSpacing={1}
          sx={{ backgroundColor: "white" }}
        >
          <Grid item xs={12} sx={{ backgroundColor: "white" }}>
            <p>Plan Name</p>
            <TextField
              id="outlined-basic"
              helperText="Please enter your project name"
              variant="outlined"
              color="secondary"
              focused
              onChange={handleProjName}
            />
          </Grid>
          <Grid item xs={12} sx={{ backgroundColor: "white" }}>
            <p>Competition Name</p>
            <TextField
              id="outlined-basic"
              helperText="Please enter the competition name"
              variant="outlined"
              color="secondary"
              focused
              onChange={handleCompName}
            />
          </Grid>

          <Grid item xs={12}>
            <p>Date of Event</p>
            <input type="date" onChange={(e: any) => setDate(e.target.value)} />
          </Grid>

          <Grid item xs={12} sx={{ paddingBottom: 2 }}>
            <p>Field Information</p>
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
          <Grid item xs={12} sx={{ paddingBottom: 2 }}>
            <CustomButton
              text="Import CSV File"
              onClick={() => {
                if (inputRef.current) {
                  // Call the click() method on inputRef.current
                  inputRef.current.click();
                }
              }}
            />
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />

            {result === "error" && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle> You must select an excel document
                — <strong>try again!</strong>
              </Alert>
            )}
            {result === "success" && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Successfully read given excel file — <strong>continue!</strong>
              </Alert>
            )}
          </Grid>
        </Grid>
      </Box>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CustomButton text="Go Back" onClick={prevPage} negative />
        <CustomButton
          text="Continue"
          onClick={() => {
            saveFinalData();
            navigate("/teamselection");
          }}
        />
      </div>
    </Paper>
  );
}

function convertTZ(date: Date, tzString: string) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-AU", {
      timeZone: tzString,
    }),
  );
}