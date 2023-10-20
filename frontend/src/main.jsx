import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraBaseProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraBaseProvider>
      <App />
    </ChakraBaseProvider>
  </BrowserRouter>
);
