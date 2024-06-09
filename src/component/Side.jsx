import React from "react";
import backgroundImage from "../assets/CymmetriFP.png";

const leftSideStyles = {
  minHeight: "100vh",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const Side = () => {
  return <div style={leftSideStyles}></div>;
};
