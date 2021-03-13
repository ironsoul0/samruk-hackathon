import React from "react";
import clsx from "clsx";

import classes from "./Container.module.css";

const Container = ({ children, className }) => (
  <div className={clsx(classes.container, className)}>{children}</div>
);

export default Container;
