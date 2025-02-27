import React, { useEffect, useState } from "react";
import DateTime from "./DateTime";
import { CiCircleCheck } from "react-icons/ci";
import DarkLight from "./DarkLight";

const CheckList = () => {
  const [input, SetInput] = useState("")
  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [dark, setDark] = useState(false);

  // Save tasks to localStorage whenever task list changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task])

 
// Handle input field 
const handleInputChange = (e) => {
  SetInput(e.target.value)
};

  // handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length) {
      setTask((prevInput) => [
        ...prevInput,
        { newtask: input, checked: false }
      ]);
      SetInput("")
    }
  };


  // handle Delete button
  const handleTaskDelete = (index) => {
    const newTask = task.filter((_, i) => i !== index);
    setTask(newTask)
  };

  // handle Checklist 
  // const handleCheckList = (index) => {
  //   const newTask = [...task];
  //   newTask[index].checked = !newTask[index].checked;
  //   setTask(newTask)
  // };

// Mark task as completed
const handleCheckList = (index) => {
  const updatedTasks = task.map((t, i) =>
    i === index ? { ...t, checked: !t.checked } : t
  );
  setTask(updatedTasks);
};




  return (
    <>
    <div className={`flex flex-col items-center gap-4 min-h-screen w-full 
    ${dark ? "bg-gradient-to-r from-zinc-700 via-gray-900 to-stone-800" : "bg-gradient-to-r from-indigo-700 via-purple-400 to-indigo-300"} 
    ${dark ? "text-white" : "text-zinc-900"}`}>

      <h2 className="text-2xl sm:text-3xl font-bold mt-5">Create Your Daily Task List</h2>
      <DateTime /> 
      <DarkLight setDark={setDark} dark={dark}  />
      <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-lg flex flex-col sm:flex-row gap-2 lg:ms-20">
        <input
          className={`w-full sm:w-80 px-4 py-3 text-lg font-bold border-4 border-purple-400  rounded-xl ${dark?"text-stone-900 bg-gray-200 ":"text-zinc-900"}`}
          type="text"
          placeholder="Enter your Task"
          value={input}
          onChange={(e) => handleInputChange(e)}
          />
        <button
          className="bg-purple-600 hover:bg-purple-500 px-6 py-3 font-bold text-xl rounded-3xl cursor-pointer active:bg-purple-200"
          >
          Add Task
        </button>
          </form>
      <ul className="w-full max-w-lg flex flex-col gap-3">
        {task.map((task, index) => (
          <li
            className={`flex items-center justify-between mt-4 min-w-120 p-4 border-4 border-solid border-purple-500 rounded-2xl  ${
              task.checked ? "bg-purple-900 text-white" : "bg-gray-200 text-black"
            }`}
            key={index}
          >
            <div
              className={`text-xl font-bold ms-3 ${
                task.checked ? "line-through text-gray-600" : "text-gray-800"
              }`}
              >
              {task.newtask}
            </div>
            <span className="ms-5 me-5 text-lg font-bold text-zinc-900">
              {task.checked ? "Task Completed" : ""}
            </span>

            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 font-bold bg-red-500 hover:bg-red-400 active:bg-red-100 rounded-lg "
                onClick={() => handleTaskDelete(index)}
              >
                Delete
              </button>
              <button
                className={`px-4 py-2 text-xl font-bold rounded-lg ${
                  task.checked ? "text-green-300" : "text-red-600"
                }`}
                onClick={() => handleCheckList(index)}
              >
                <CiCircleCheck />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
     <div className="text-xl font-bold text-center py-2 bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500">copyright &copy;Mohd Azimuddin</div>
                </>
  );
};

export default CheckList;




