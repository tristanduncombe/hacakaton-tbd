import React, { useRef } from "react";
import CustomButton from "../button/Button";
import { Button } from "@mui/material";
import PapaParse from "papaparse";

export default function Import() {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFileSelect = (event: any) => {
        const file = event.target.files[0];
        console.log(file);
        console.log(file.name);
        console.log(file.type);
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

            /** Look at what kind of file it is:
             * If its csv, do above...
             * If its (excel? ) do this...
             * Else say try again
             */

            },
        });
    };

    

  return (
    <div className="App">
        <CustomButton text="Import CSV File" onClick={() => {
          if (inputRef.current) {
            // Call the click() method on inputRef.current
            inputRef.current.click();
          }
        }} /> 
      <input type="file" ref={inputRef} onChange={handleFileSelect} style={{ display: "none" }} />
    </div>
  );
}
