import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllChecklists, deleteChecklist } from "../api";
import Button from "../components/Button";
import "../App.css";




export default function Dashboard() {
  const [checklists, setChecklists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChecklists = async () => {
     const data = await getAllChecklists();
    setChecklists(data);
    };
    fetchChecklists();
  }, []);




  const handleDelete = async (id) => {
   if (window.confirm("Are you sure you want to delete this checklist?")) {
  await deleteChecklist(id);
  setChecklists((prev) => prev.filter((list) => list.id !== id));
    }
  };

  return (
    <div className="p-4  h-[200vh]  bg-black  "  >
      <h1 className="text-6xl  text-center text-white font-bold">Dashboard</h1>



        <div  className="    rounded-lg     relative w-[80%]  top-[5%]  drop-shadow-2xl  h-[40%]  left-[10%] ">


      <Button className = "relative left-[45%]   bg-customYellow  "   onClick={() => navigate("/form")}>New Checklist</Button>
      {checklists.length === 0 ? (
        <p  className="  bg-customRed  text-white ">No checklists available.</p>
      ) : (
        checklists.map((list) => (
          <div key={list.id} className=" text-white   bg-black  text-center   border-2 border-white border-spacing-y-3  rounded-2xl  drop-shadow-2xl    h-[25%] space-x-2 ">
            <h2>{list.title}</h2>
            <p>{list.description}</p>
 

         
            <Button   className=" relative top-[50%] bg-customYellow" onClick={() => navigate(`/form/${list.id}`)}>Edit</Button>

            <Button  className=" relative top-[50%] bg-customRed " onClick={() => handleDelete(list.id)}>Delete</Button>


 {/* Bouton pour accéder à la checklist */}
 <Button
      className="relative top-[50%] bg-blue-500"
      onClick={() => navigate(`/checklist/${list.id}`)}
    >
      View Checklist
    </Button>

          </div>

        ))
      )}
    </div>
    </div>
  );
}