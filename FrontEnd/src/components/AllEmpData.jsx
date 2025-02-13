import React from 'react'

const AllTask = ({employees}) => {
  console.log(employees)
  return (
    <div className='p-3 mt-5 rounded bg-[#031114]' >

       <div className='bg-[#0f5661] mb-2 py-2 px-4 flex text-white justify-between rounded'>
             <h2 className='text-lg w-1/5 font-bold'>Employee Name</h2>
             <h3 className='text-lg w-1/5 font-bold'>New Tasks</h3>
             <h5 className='text-lg w-1/5 font-bold'>Completed</h5>
             <h5 className='text-lg w-1/5 font-bold'>Failed</h5>
       </div>
   <div >

    {employees.map((emp)=>{
      return  <div key={emp._id} className='border-2 border-[#0f5661] mb-2 py-2 px-4 flex justify-between rounded'>
                <h2 className='text-lg font-medium w-1/5 text-white'>{emp.fullname}</h2>
                <h3 className='text-lg font-medium pl-8 w-1/5 text-blue-600'>{emp.userTasks.newTask.tasks.length}</h3>
                <h5 className='text-lg font-medium pl-8 w-1/5 text-emerald-600'>{emp.userTasks.completed.tasks.length}</h5>
                <h5 className='text-lg font-medium pl-5 w-1/5 text-red-600'>{emp.userTasks.failed.tasks.length}</h5>
        </div>
    })}

   </div>

    </div>
  )
}

export default AllTask