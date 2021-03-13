import React from "react";
import { AiOutlineLoading as LoadingSpinner } from "react-icons/ai";

import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.root}>
      <LoadingSpinner className={styles.spinner} />
    </div>
  );
}

export default Spinner;
