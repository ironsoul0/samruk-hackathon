import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import About from "./components/about";
import Header from "./components/header";
import Table from "./components/table";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/">
        <Table />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
    </Router>
  );
}

export default App;
