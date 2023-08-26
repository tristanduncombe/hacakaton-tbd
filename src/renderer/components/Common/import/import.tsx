import React, { useRef } from "react";
import CustomButton from "../button/Button";
import { Alert, AlertTitle } from "@mui/material";
import PapaParse from "papaparse";
import { read, utils} from "xlsx";
import { useState } from "react";

export default function Import() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [result, setResult] = useState('');


    const handleFileSelect = (event: any) => {
        const result = "error";
        const file = event.target.files[0];
        
        const fileName = file.name
        const fileExtension = fileName.split(".").pop(); 
        const validExtensions = ["xls", "xlsx", "xlsm"]; 

        if (validExtensions.includes(fileExtension)) { // If the file is an excel file
            console.log("Got through the first one")
            const reader = new FileReader(); 
            reader.onload = (e: any) => { 
                const data = e.target.result; 
                const workbook = read(data, { type: "array" }); 
                const sheetName = workbook.SheetNames[0]; 
                const worksheet = workbook.Sheets[sheetName]; 
                const json = utils.sheet_to_json(worksheet); 
                console.log(json); // This is the JSON object
                const fileData = JSON.stringify(json); 
                const blob = new Blob([fileData], { type: "text/plain" }); 
                const url = URL.createObjectURL(blob); 
                const link = document.createElement("a"); 
                link.download = "imported_data.json"; 
                link.href = url; link.click(); 
            }; 
            reader.readAsArrayBuffer(file);
            setResult('success');
             

        } else if (file.type == "text/csv") { // If the data is a csv file
            console.log(fileExtension)
            console.log(file.type)
            console.log(file.name)
            console.log("Got through the second one")
            PapaParse.parse(file, {
                header: true,
                complete: (results: any) => {
                console.log(results.data); // This is the JSON object
                const fileData = JSON.stringify(results.data); 
                const blob = new Blob([fileData], { type: "text/plain" }); 
                const url = URL.createObjectURL(blob); 
                const link = document.createElement("a"); 
                link.download = "imported_data.json"; 
                link.href = url; link.click();
            }})
            setResult('success');
        } else {
            setResult('error');
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
              <AlertTitle>Error</AlertTitle> This is an error alert —{" "}
              <strong>check it out!</strong>
            </Alert>
          )}
          {result === "success" && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              This is a success alert — <strong>check it out!</strong>
            </Alert>
          )}
        </div>
      );
};