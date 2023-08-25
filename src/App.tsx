import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import Home from "./components/home/home";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Home />
            </header>
        </div>
    );
}

export default App;
