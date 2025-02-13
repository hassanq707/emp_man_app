import React from "react";

const TaskCounts = ({ data }) => {
  const colors = {
    completed: "bg-emerald-400", 
    failed: "bg-red-400",
    newTask: "bg-blue-400",
  };

  let bgColor = colors[data.type];

  return (
    <div className={`text-white ${bgColor} rounded-xl w-[30%] py-6 px-9`}>
      <h2 className="text-3xl font-bold">{data.count}</h2>
      <h3 className="text-xl mt-0.5 font-medium">{data.type}</h3>
    </div>
  );
};

export default TaskCounts;
