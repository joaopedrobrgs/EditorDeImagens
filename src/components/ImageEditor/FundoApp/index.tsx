import React from "react";

type Props = {};

const FundoApp = (props: Props) => {
  return (
    <div className="border border-blue-200 border-2 rounded px-2 py-4">
      <div className="flex justify-between items-center">
        <p className="font-bold">Recortar Logo APP:</p>
        <button className="bg-blue-200 text-white p-2 rounded">Upload logo app</button>
      </div>
    </div>
  );
};

export default FundoApp;
