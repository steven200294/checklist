import React, { useEffect, useState } from "react"; // Import React and hooks for state and side effects
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for routing
import { getChecklist, updateChecklist } from "../api"; // Import API functions to fetch and update data

export default function Checklist() {
  const { id } = useParams(); // Extract the 'id' from the URL
  const [checklist, setChecklist] = useState(null); // State to store the checklist data
  const navigate = useNavigate(); // Hook to navigate to other pages

  useEffect(() => {
    // useEffect runs when the component loads or 'id' changes
    const fetchChecklist = async () => {
      const data = await getChecklist(id); // Fetch the checklist data using the API
      setChecklist(data); // Update the state with the fetched data
    };
    fetchChecklist(); // Call the function to fetch the data
  }, [id]); // Dependency array: re-run if 'id' changes

  const toggleTask = (taskId) => {
    // Function to toggle the task's status
    const updatedTodos = checklist.todo.map((task) =>
      task.id === taskId ? { ...task, status: task.status === 1 ? 0 : 1 } : task // Toggle status
    );
    setChecklist({ ...checklist, todo: updatedTodos }); // Update the state with the new tasks
  };

  const saveChanges = async () => {
    // Function to save changes to the checklist
    await updateChecklist(id, checklist.title, checklist.description, checklist.todo); // Update API
    navigate("/"); // Navigate back to the home page
  };

  if (!checklist) return <p>Loading...</p>; // Show a loading message if the data is not ready

  return (
    <div className="p-4 bg-black h-[100vh]">
      {/* Main container with styling */}
      <div className="top-[35%] relative left-[32%] h-[20%] item center justify-items-center w-[40%] border-2 border-white border-spacing-y-3 rounded-2xl">
        <h1 className="text-2xl font-bold relative left-[42%] text-white">{checklist.title}</h1>
        {/* Display the checklist title */}
        <p className="text-white relative left-[40%]">{checklist.description}</p>
        {/* Display the checklist description */}
        <ul>
          {checklist.todo.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  className="bg-white text-white"
                  type="checkbox"
                  checked={task.status === 1} // Check if the task is done (status === 1)
                  onChange={() => toggleTask(task.id)} // Toggle the task when clicked
                />
                {task.title} {/* Show the task title */}
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={saveChanges}
          className="bg-blue-500 relative top-[40%] left-[40%] text-white p-2 rounded"
        >
          Save
        </button>
        {/* Button to save changes */}
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 relative top-[40%] left-[42%] text-white p-2 rounded"
        >
          Back
        </button>
        {/* Button to go back to the home page */}
      </div>
    </div>
  );
}