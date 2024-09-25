import React from "react";
import { BarLoader } from "react-spinners";
import AppLogo from "./AppLogo";

function AppLoader() {
  return (
    <div
      className="absolute left-1/2 top-1/2 transform 
    -translate-x-1/2 -translate-y-1/2"
    >
      <div className="my-3">
        <AppLogo />
      </div>
      <BarLoader color="blue" width={"100%"} />
    </div>
  );
}

export default AppLoader;
