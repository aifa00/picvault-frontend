import React from "react";
import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div
      className="absolute left-0 top-0 flex items-center 
        justify-center bg-white opacity-75 w-full h-full z-50"
    >
      <FadeLoader color="blue" />
    </div>
  );
}

export default Loader;
