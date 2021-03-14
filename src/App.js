import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import About from "./components/about";
import Header from "./components/header";
import Table from "./components/table";
import Dashboard from "./components/dashboard";
import Analysis from "./components/analysis";

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
      <Route exact path="/chart/:trainNumber">
        <Dashboard />
      </Route>
      <Route exact path="/analysis">
        <Analysis />
      </Route>
    </Router>
  );
}

export default App;
