import React from "react";

function ConfirmationModal({data}) {
    console.log(data)
  return (
    <div className="h-screen fixed left-0 top-0 z-50 w-full bg-white/30 backdrop-blur-md flex justify-center items-center">
  <div className="flex flex-col px-12 py-8 gap-4 border border-gray-300 bg-white rounded-xl shadow-lg">
    <div className="text-3xl text-gray-700 font-bold">{data.text1}</div>
    <p className="text-gray-600 text-sm">{data.text2}</p>

    <div className="flex gap-2">
      <button onClick={data.btn1Handler} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
        {data.btn1Text}
      </button>
      <button onClick={data.btn2Handler} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
        {data.btn2Text}
      </button>
    </div>
  </div>
</div>

  );
}
export default ConfirmationModal;
