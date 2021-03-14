import React from "react";
import clsx from "clsx";

import classes from "./Container.module.css";

const Container = ({ children, className, bottomShift }) => (
  <div
    className={clsx([
      classes.container,
      className,
      bottomShift && classes.bottomShift,
    ])}
  >
    {children}
  </div>
);

export default Container;
