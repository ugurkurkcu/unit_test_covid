import React from "react";
import { IoWarning } from "react-icons/io5";

const Error = ({ message, retry }) => {
  return (
    <div className=" col-span-3 w-full flex flex-col gap-6 h-full items-center">
      <div className=" flex items-center gap-4 bg-red-600 rounded-xl p-5 w-full shadow-lg shadow-gray-500">
        <IoWarning className="text-4xl" />

        <div className="  gap-4 flex flex-col">
          <h1 className=" text-xl font-bold">
            Sorry! There is an error occured
          </h1>
          <p className=" text-md text-gray-200">{message}</p>
        </div>
      </div>

      <button
        onClick={retry}
        className="  border-red-600 border rounded-lg text-red-600 w-2/5  shadow-md shadow-gray-500"
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;
