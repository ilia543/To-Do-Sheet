"use client"

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { BiSun } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";

type Task = {
  task: string;
  time: string;
};

export default function Home() {
  const [theme, setTheme] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const formData = new FormData(e.currentTarget); 
    const task_inp = formData.get("task");

    if (typeof task_inp === "string" && task_inp.length > 0) {
      const newTask: Task = {
        task: task_inp,
        time: new Date().toLocaleString(),
      };

      setTasks((pr) => {
        const updated = [...pr, newTask];
        localStorage.setItem("tasks", JSON.stringify(updated));
        return updated;
      });
    }

    e.currentTarget.reset();
  };

  const RemoveTask = (index: number) =>{
    setTasks((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <div className={` h-screen flex flex-col items-center ${theme ? `bg-white` : `bg-black`}`}>
      <div className=" flex justify-end p-4 pr-8 w-full">
        {theme ? (
          <motion.button
            onClick={() => setTheme(!theme)}
            className=" border-2 rounded-2xl p-1 flex items-center justify-center gap-2"
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
          >
            <BiMoon />
            Dark theme
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setTheme(!theme)}
            className=" border-2 text-white border-white rounded-2xl p-1 flex items-center justify-center gap-2"
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
          >
            <BiSun color="orange"/>
            Light theme
          </motion.button>
        )}
      </div>

      <div className={`border-2 rounded-xl p-6 flex flex-col gap-4 ${theme ? `border-black shadow-[5px_5px_5px_#2282a9]` : `border-white shadow-[5px_5px_5px_#2282a9]`} transition duration-400 hover:shadow-none`}>
        <div className="flex items-center justify-center gap-3">
          <h1 className={`inher text-4xl ${theme ? `text-sky-800` : `text-sky-600`}`}>Add Task</h1>
          <FaTasks size={32} color="blue"/>
        </div>
        <form 
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          
          <motion.input
            type="text" 
            name="task" 
            id="task" 
            className={` ${theme ? `text-black` : `text-white`} border-2 w-64 max-[330px]:w-42 h-8 rounded-lg ${theme ? `border-gray-600` : `border-gray-300`}`}
            whileHover={{rotate: 1}}
            whileTap={{rotate: -4}}
          />

          <button 
            type="submit"
            className={`border-2 text-xl rounded-xl w-full ${theme ? `bg-green-400 border-green-700 text-black hover:bg-green-600` : `bg-green-700 border-green-300 text-white hover:bg-green-500`}`}
          >Add Task</button>
        </form>
      </div>


      {tasks.length > 0 && (
        <div className={`border-3 mt-2 ${theme ? `border-blue-700 shadow-[0px_0px_10px_skyblue]` : `border-blue-400 shadow-[0px_0px_10px_skyblue]`} rounded-xl p-6 flex flex-col gap-2`}>
          {tasks.map((el, index) => (
            <div 
              className={` flex flex-col p-1 pr-4 pl-4 border-2 rounded-xl w-128 max-[330px]:w-42 max-[580px]:w-96 max-[445px]:w-64 ${theme ? `border-green-600` : `border-green-400`}`}
              key={index}
            >
              <div className="flex justify-between">
                <p className={`${theme ? `text-black` : `text-white`}`}>{el.time}</p>
                <button 
                    onClick={() => RemoveTask(index)}
                    className=" italic rounded-full w-24 border-2 border-green-700 bg-green-600 flex items-center justify-center text-white pr-1 pl-1 hover:scale-110 transition-transform"
                  >
                    Done
                </button>
              </div>
              <p className={`text-xl break-words ${theme ? `text-black` : `text-white`}`}>{el.task}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
