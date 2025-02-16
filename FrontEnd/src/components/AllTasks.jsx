import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_emp_data } from '../store/slices/UserSlice';

const AllTasks = ({ task }) => {

  const { title, description, date, category } = task

  const dispatch = useDispatch();

  const {emp_data} = useSelector(result => result.data)

  
  const handleBtnClick = (btn) => {
    const updatedTask = emp_data.userTasks[btn].tasks
    if(updatedTask.some(obj => obj._id == task._id)) return null
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/updateTask`, { btn, task } , {withCredentials : true})
      .then((response) => {
          const updatedUser = {...emp_data , userTasks : response.data.userTasks}
          dispatch(set_emp_data(updatedUser))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="bg-blue-400 flex-shrink-0 h-full w-[300px] p-5 rounded-xl">
      <div className='my-2 flex item-center justify-between'>
        <span className='bg-red-600 p-2 text-sm rounded'>
          {category}
        </span>
        <p className='mt-1'>
          {date}
        </p>
      </div>
      <h2 className='mt-5 mb-2 text-2xl font-semibold'>{title}</h2>
      <p>{description}</p>
      <div className='flex items-center gap-3 justify-center mt-5 mb-3 w-full'>
        <button onClick={() => handleBtnClick("completed")} className='w-1/2 bg-emerald-600 hover:bg-emerald-800 py-2 px-3 text-md rounded-md'>Completed</button>
        <button onClick={() => handleBtnClick("failed")} className='w-1/2 bg-red-600 hover:bg-red-800 py-2 px-3 text-md rounded-md' >Failed</button>
      </div>
    </div>
  );
}

export default AllTasks;
