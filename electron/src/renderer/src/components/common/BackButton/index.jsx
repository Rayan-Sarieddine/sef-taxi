import React from "react";
import "./style.css";
export const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <a className="flex center round" onClick={goBack}>
      &#8249;
    </a>
  );
};
