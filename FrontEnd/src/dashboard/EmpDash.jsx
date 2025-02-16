import React, { useEffect, useState } from "react";
import "../index.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import Header from "../components/Header";
import TaskCounts from "../components/TaskCounts";
import AllTasks from "../components/AllTasks";
import axios from "axios";
import { set_emp_data } from "../store/slices/UserSlice";

const EmpDash = () => {

    const { emp_data } = useSelector((state) => state.data);

    const [btn, setBtn] = useState("newTask")

    const [isAuthorized, setIsAuthorized] = useState(false);

    const [tasks, setTasks] = useState([])

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`, {withCredentials : true})
                dispatch(set_emp_data(response.data))
                setIsAuthorized(true)
            }
            catch (err) {
                if (err.response && err.response.status === 401) {
                    console.log(err) 
                    if(err.response.data.message == "Unauthorized"){
                        alert("You cannot access employees Dashboard");
                        return navigate('/admin')
                    }
                    return navigate("/login")
                } else {
                    console.log(err);
                }
                setIsAuthorized(false);

            }
        }
        fetchUserData()
    }, []);


    useEffect(() => {
        setTasks(emp_data.userTasks?.[btn].tasks || []);
    }, [btn, emp_data]);
    

    const taskCountsArray = emp_data.userTasks
    ? Object.entries(emp_data.userTasks).map(([key, value]) => ({
        type: key,
        count: value.tasks.length 
    }))
    : [];

    if(!isAuthorized) return null;
    return (
        emp_data.length == 0 ? null : (
            <div className="box-border h-screen w-screen bg-[#031114]">
                <Header name={emp_data.fullname} />
                <div className="flex mt-10 gap-5 screen justify-center items-center">
                    {taskCountsArray.map((elem, index) => {
                        return <TaskCounts data={elem} key={index} />;
                    })}
                </div>
                <div className="flex my-4 gap-5 screen justify-center items-center">
                    {taskCountsArray.map((elem, index) => {
                        return <button 
                        key={index} 
                        onClick={() => setBtn(elem.type)} 
                        className={`text-white rounded-md px-4 py-2 font-semibold 
                         ${btn === elem.type && tasks.length> 0 ? "bg-[#0c535e]" : "bg-blue-400"}`}>
                              {elem.type}
                        </button>
                    })}
                </div>
                <div className={`h-[45%] p-3 text-white overflow-x-auto ${tasks.length > 0 ? "flex items-center justify-start gap-5 flex-nowrap" : ""}py-1`}>
                    {
                        tasks.length > 0 ? (
                            tasks.map((data, index) => {
                                return <AllTasks task={data} key={index} />
                            })
                        )
                            :
                            <h1 className="text-center text-lg">No Tasks Found</h1>
                    }
                </div>
            </div>
        )
    );
};

export default EmpDash;

