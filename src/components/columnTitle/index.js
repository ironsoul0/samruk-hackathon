import React from "react";

import clsx from "clsx";
import { useHover } from "../../hooks";
import { InfoIcon } from "../icons";
import styles from "./ColumnTitle.module.css";

const ColumnTitle = ({ title, tooltipText }) => {
  const [hoverRef, isHovered] = useHover();

  return (
    <div className={styles.root}>
      <p>{title}</p>
      <span ref={hoverRef}>
        <InfoIcon className={styles.icon} />
      </span>
      <div
        className={clsx([styles.tooltipMy, isHovered && styles.tooltipShown])}
      >
        We love Krauch
      </div>
    </div>
  );
};

export default ColumnTitle;
