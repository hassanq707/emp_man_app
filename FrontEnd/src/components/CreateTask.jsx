import axios from 'axios';
import React, { useState } from 'react';

const CreateTask = ({ employees, setEmployees, names = [] }) => {

  const [data, setData] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
    assignTo: 'Select Employee'
  });

  const emp_names = ["Select Employee", ...names]

  const onChangeHandler = (e) => {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value
    })
  }


  const submitHandler = (e) => {

    e.preventDefault()

    if (data.assignTo === "Select Employee") return alert("Please select an employee!")

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/createTask`, data, {withCredentials : true})
      .then((response) => {
        const { fullname, userTasks: updatedTask} = response.data
        setEmployees(
          employees.map((elem) => {
            if (elem.fullname == fullname) {
              return {...elem , userTasks : {
                 ...elem.userTasks,
                 newTask : {
                  value : updatedTask.newTask.value,
                  tasks : [...elem.userTasks.newTask.tasks , updatedTask.newTask.tasks]
                 }
              }}
            }
            else {
              return elem
            }
          })
        )
      })
      .catch((err) => console.log(err))
      setData({
        title: '',
        description: '',
        date: '',
        category: '',
        assignTo: 'Select Employee'
      })
      alert("Task has been assigned to: " + data.assignTo)
  }
  return (
    <div className="p-5 border-2 border-[#0f5661]  backdrop-blur-md  mt-7 rounded text-white">
      <form onSubmit={submitHandler} className="flex flex-wrap w-full items-start justify-between">
        <div className="w-1/2">
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={data.title}
              name="title"
              onChange={onChangeHandler}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] mb-4 border-gray-400"
              type="text"
              placeholder="Make a UI Design"
            />
          </div>

          <div>
            <h1 className="text-sm text-gray-300 mb-0.5">Date</h1>
            <input
              value={data.date}
              name="date"
              onChange={onChangeHandler}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] mb-4 border-gray-400"
              type="date"
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Assign To</h3>
            <select name="assignTo" value={data.assignTo} onChange={onChangeHandler} className="text-sm py-1 px-2  w-4/5 rounded outline-none bg-transparent border-[1px] mb-4 border-gray-400">
              {emp_names.map((user, index) => {
                return <option value={user} key={index} className='bg-[#1c1c1c]'>
                  {user}
                </option>
              })}
            </select>
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={data.category}
              name="category"
              onChange={onChangeHandler}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] mb-4 border-gray-400"
              type="text"
              placeholder="design, dev, etc."
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={data.description}
            name="description"
            onChange={onChangeHandler}
            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
          ></textarea>
          <button type="submit" className="bg-[#0f5661] py-3 hover:bg-[#0e3c43] px-5 rounded text-sm mt-4 w-full">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export { CreateTask };
