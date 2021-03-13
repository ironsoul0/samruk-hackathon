import React from "react";

const Info = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#a7b0c1"
    width="25"
    height="25"
    viewBox="0 0 24 24"
    stroke="white"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default Info;
