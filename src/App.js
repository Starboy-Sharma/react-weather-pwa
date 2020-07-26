import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component={Home} path="/" exact />
      </div>
    </BrowserRouter>
  );
};

export default App;
