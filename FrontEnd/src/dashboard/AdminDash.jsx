import React, { useEffect, useState } from 'react'
import axios from "axios"
import Header from '../components/Header'
import { CreateTask } from '../components/CreateTask'
import AllEmpData from '../components/AllEmpData'
import { useNavigate } from 'react-router'

const AdminDash = () => {
    const [employees, setEmployees] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();


    console.log("Hassan qadri")

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/allUsers`)
                const {allUsers,admin} = response.data
                setEmployees(allUsers)
                setIsAuthorized(true)

            }
            catch (err) {
                console.log(err)
                if (err.response && err.response.status === 401) {
                    alert("You are Unauthorized to access this page");
                    navigate("/") 
                } 
                setIsAuthorized(false);
            }
        }
        fetchUserData();
    }, []);

    if (!isAuthorized) return null; 

    return (
        <div className="bg-[#031114] h-screen">
            <Header name="Admin" />
            <CreateTask names={employees.map(emp => emp.fullname)} employees={employees} setEmployees={setEmployees} />
            <AllEmpData employees={employees} />
        </div>
    )
}

export default AdminDash;
