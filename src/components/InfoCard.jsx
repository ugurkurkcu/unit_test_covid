import React from "react";

const InfoCard = ({ item }) => {
  return (
    <div className=" bg-gray-300 p-4 rounded-lg shadow-lg shadow-zinc-700 text-gray-600 capitalize">
      <p className=" text-sm font-semibold mb-2">{item[0].split("_").join(" ")}</p>
      <h2 className=" text-lg font-bold text-gray-800">{item[1]}</h2>
    </div>
  );
};

export default InfoCard;
