import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ForkMe from "./components/forkMe";
import About from "./components/about";
import Header from "./components/header";
import Table from "./components/table";
import AddOrder from "./components/addOrder";
import EditOrder from "./components/editOrder";

function App() {
  const { open, pickedId } = useSelector((state) => state.modal);

  return (
    <Router>
      <Header />
      <Route exact path="/">
        <Table />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <AddOrder isOpen={open && !pickedId} />
      {pickedId && <EditOrder isOpen={open} />}
      <ForkMe />
    </Router>
  );
}

export default App;
