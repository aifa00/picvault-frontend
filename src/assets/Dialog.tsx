import React from "react";

function Dialog({ message, onCancel, onSuccess }: any) {
  return (
    <div
      className="fixed flex items-center justify-center 
      p-3 top-0 left-0 right-0 bottom-0 bg-black/10 z-50"
    >
      <div className="w-96 p-10 bg-white rounded-lg shadow text-center">
        <h1 className="text-xl">{message}</h1> <br /> <br />
        <div className="flex">
          <button
            className="flex-1 border-2 p-2 rounded-full mx-1 border-indigo-500 hover:bg-indigo-500"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-red-600 p-2 rounded-full mx-1 hover:bg-red-500"
            onClick={onSuccess}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
