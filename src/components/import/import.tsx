import React, { useRef } from "react";
import CustomButton from "../button/Button";
import { Button } from "@mui/material";

export default function Import() {


    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
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
