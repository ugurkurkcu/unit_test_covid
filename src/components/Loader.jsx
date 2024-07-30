import React from "react";

const Loader = ({ type }) => {
  const mocArr = new Array(16).fill();
  if (type === "header")
    return (
      <div
        data-testid="header-loader"
        className=" flex items-center space-x-2 animate-pulse"
      >
        <div className=" w-24 h-[64px] bg-gray-400 rounded-md"></div>
        <div className=" w-[120px] h-[36px] bg-gray-400 rounded-md"></div>
      </div>
    );
  return mocArr.map((i, k) => (
    <div
      data-testid="card-loader"
      key={k}
      className=" bg-gray-300 p-4 rounded-lg shadow-lg shadow-zinc-700 text-transparent min-w-[256px] capitalize select-none animate-pulse"
    >
      <p className=" bg-gray-400 rounded-md w-2/5 text-sm font-semibold mb-2">
        .
      </p>
      <h2 className=" bg-gray-500 rounded-md w-3/4 text-lg font-bold">.</h2>
    </div>
  ));
};

export default Loader;
