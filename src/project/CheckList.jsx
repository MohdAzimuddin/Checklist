import React, { useEffect, useState } from "react";
import DateTime from "./DateTime";
import { CiCircleCheck } from "react-icons/ci";
import DarkLight from "./DarkLight";
import { MdDeleteForever } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";

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
  const handleCheckList = (index) => {
    const newTask = [...task];
    newTask[index].checked = !newTask[index].checked;
    setTask(newTask)
  };


const handleClarAllbtn=()=>{
  setTask([])
}




  return (
    <>
    <div className={`flex flex-col items-center gap-4 flex-wrap min-h-screen w-full overflow-hidden box-border md:max-with-full
    ${dark ? "bg-gradient-to-r from-zinc-700 via-gray-900 to-stone-800" : "bg-gradient-to-r from-indigo-700 via-purple-400 to-indigo-300"} 
    ${dark ? "text-white" : "text-zinc-900"}`}>

      <h2 className="text-2xl sm:text-3xl font-bold mt-5">Create Your Daily Task List</h2>
      <DateTime /> 
      <DarkLight setDark={setDark} dark={dark}  />
      <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-xl flex flex-col gap-1 sm:flex-row">
        <input
          className={`w-full max-w-md px-4 py-3 text-lg font-bold border-4 border-purple-400 rounded-xl ${dark?"text-stone-900 bg-gray-200 ":"text-zinc-900"}`}
          type="text"
          placeholder="Enter your Task"
          value={input}
          onChange={(e) => handleInputChange(e)}
          />
        <button
          className="max-w-md bg-purple-600 hover:bg-purple-500 px-6 py-2 font-bold text-md rounded-xl cursor-pointer active:bg-purple-200"
          >
          Add Task
        </button>
          </form>
      <ul className="w-full max-w-lg flex flex-col gap-3 mb-5  md:max-w-lg">
        {task.map((task, index) => (
          <li
            className={`flex flex-col gap-2 items-center justify-between font-xl mt-4 p-4 border-4 border-solid border-purple-500 rounded-2xl sm:flex-row ${
              task.checked ? "bg-purple-500 text-white" : "bg-gray-200 text-black"
            }`}
            key={index}
          >
            <div
              className={`text-xl font-bold max-w-sm overflow-hidden sm:text-md ${
                task.checked ? "line-through text-gray-600 " : "text-gray-800"
              }`}
              >
              {task.newtask}
            </div>
            <span className="text-md font-bold text-green-900">
              {task.checked ? (<FaRegThumbsUp />) : ""}
            </span>

            <div className={`flex items-center gap-2 ${dark?"text-white" : "text-zinc-900"}`}>
              <button
                className="px-2 py-2 ml-3 font-bold bg-red-600 hover:bg-red-500 active:bg-red-100 rounded-lg text-2xl"
                onClick={() => handleTaskDelete(index)}
              >
                <MdDeleteForever/>
              </button>
              <button
                className={`p-1 text-3xl font-bold rounded-3xl ${
                  task.checked ? "bg-green-300 text-white" : "bg-red-500 text-gray-300"
                }`}
                onClick={() => handleCheckList(index)}
              >
                <CiCircleCheck />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className={`px-4 py-2 bg-red-700 rounded-xl font-bold text-lg text-black mb-4 hover:bg-red-500 active:bg-red-100 ${dark?"text-white" : "text-zinc-900"}`} onClick={handleClarAllbtn}>Clear All</button>
    </div>
     <div className="text-xl font-bold text-center py-3 bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500">copyright &copy;Mohd Azimuddin</div>
                </>
  );
};

export default CheckList;




