import React from "react";
import Spinner from "./Spinner";

const Button: React.FC<any> = ({ label, onClick, loading, error }) => {
  return (
    <>
      <button
        className={`w-full p-2 lg:p-2.5 rounded-full mt-8 border-2 font-semibold bg-white 
        outline-0 text-indigo-500 border-indigo-500 ${
          loading
            ? "cursor-not-allowed"
            : "hover:bg-indigo-500 hover:text-white"
        }`}
        onClick={onClick}
      >
        {loading ? <Spinner /> : label}
      </button>
      <span className="text-red-500">{error}</span>
    </>
  );
};

export default Button;
