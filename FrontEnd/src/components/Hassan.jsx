import React, { useEffect } from 'react'
import axios from "axios"
const Hassan = () => {
   useEffect(()=>{
     axios.get(`${import.meta.env.VITE_BACKEND_URL}/debug-token`)
     .then((response) => console.log(response.data))
     .catch((err) => console.log(err))
   }) 
  return (
    <div>Hassan</div>
  )
}

export default Hassan