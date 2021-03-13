import React from "react";

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
      {isHovered && false && (
        <div className={styles.tooltipMy}>
          Здесь полезная <br />
          информация
        </div>
      )}
    </div>
  );
};

export default ColumnTitle;
