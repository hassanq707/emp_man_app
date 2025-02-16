import React from "react";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios"
import EmpDash from "./dashboard/EmpDash";
import AdminDash from "./dashboard/AdminDash";
import Hassan from "./components/Hassan";

// Set global axios configuration
axios.defaults.withCredentials = true;
// Ab jab bhi aap axios ka use karenge, cookies automatically send ki 
// jaayengi, aur aapko har request mein withCredentials: true manually 
// set karne ki zarurat nahi padegi.

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<EmpDash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminDash />} />
      <Route path="/hassan" element={<Hassan />} />
    </>
  )
);


function App() {
  return <RouterProvider router={router} />;
}

export default App;

