import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Common/button/Button";
import { Alert, AlertTitle } from "@mui/material";
import { read, utils } from "xlsx";

export default function Import() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const nextPage = () => {
    navigate("/teamSelection");
  };

  const handleFileSelect = (event: any) => {
    const result = "error";
    const file = event.target.files[0];

    const fileName = file.name;
    let fileExtension = fileName.split(".").pop();
    let validExtensions = ["xls", "xlsx", "xlsm"];

    if (validExtensions.includes(fileExtension)) {
      // If the file is an excel file
      console.log("Got through the first one");
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        let excelPages = []
        const teamSheet = workbook.SheetNames[0]; 
        const playerSheet = workbook.SheetNames[1]; 
        const umpireSheet = workbook.SheetNames[4]; 
        excelPages.push(teamSheet, playerSheet, umpireSheet);
        let jsonObjects: {[page: string]: any} = {};

        excelPages.forEach(page => {
          const worksheet = workbook.Sheets[page]; 
          const json = utils.sheet_to_json(worksheet); 
          const fileData = JSON.stringify(json); 
          jsonObjects[page] = fileData;
        // const sheetName = workbook.SheetNames[0];
        // // const worksheet = workbook.Sheets[sheetName];
        // // const json = utils.sheet_to_json(worksheet);
        // // console.log(json); // This is the JSON object
        // // const fileData = JSON.stringify(json);
        // const blob = new Blob([fileData], { type: "text/plain" });
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement("a");
        // link.download = "imported_data.json";
        // link.href = url;
        // link.click();
        });
        console.log(jsonObjects)
      };
      reader.readAsArrayBuffer(file);
      
      setResult("success");
    } else {
      setResult("error");
    }
  };
  return (
    <div className="App">
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
          <AlertTitle>Error</AlertTitle> You must select an excel document —{" "}
          <strong>try again!</strong>
        </Alert>
      )}
      {result === "success" && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Successfully read given excel file — <strong>continue!</strong>
        </Alert>
      )}
      <CustomButton
        text="next"
        onClick={() => navigate("/createproject/import/teamselection")}
      />
    </div>
  );
}
