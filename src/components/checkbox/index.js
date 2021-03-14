import React from "react";

import styles from "./Checkbox.module.css";

function Checkbox({ text, name, ...rest }) {
  return (
    <div>
      <label>
        {text}
        <input
          type="checkbox"
          name={name}
          {...rest}
          className={styles.checkbox}
        />
      </label>
    </div>
  );
}

export default Checkbox;
