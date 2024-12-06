import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChecklist, addChecklist, updateChecklist } from "../api";
import "../App.css";

export default function Form() {
  const { id } = useParams(); // Retrieves the `id` from the URL parameters
  const [title, setTitle] = useState(""); // Manages the title of the checklist
  const [description, setDescription] = useState(""); // Manages the description of the checklist
  const [tasks, setTasks] = useState([]); // Manages the list of tasks
  const navigate = useNavigate(); // Allows navigation between pages

  useEffect(() => {
    if (id) {
      // If an `id` exists, it means we are editing an existing checklist
      const fetchChecklist = async () => {
        const data = await getChecklist(id); // Fetch the checklist data from the API
        setTitle(data.title); // Set the title from the retrieved data
        setDescription(data.description); // Set the description from the retrieved data
        setTasks(data.todo); // Set the list of tasks from the retrieved data
      };
      fetchChecklist(); // Execute the function to load the checklist data
    }
  }, [id]); // Runs this effect only when the `id` changes

  const saveChecklist = async () => {
    // Function to save the checklist
    if (id) {
      // If an `id` exists, we are updating an existing checklist
      await updateChecklist(id, title, description, tasks); // Call API to update the checklist
    } else {
      // Otherwise, we are adding a new checklist
      await addChecklist(title, description, tasks); // Call API to add a new checklist
    }
    navigate("/"); // Redirects the user to the homepage after saving
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent the page from reloading on form submission
        saveChecklist(); // Save the checklist
      }}
      className="relative flex text-white h-[100vh] items-center bg-black"
    >
      <div className="relative border border-y-gray-700 w-[50%] h-[50%] left-[22%] rounded-lg border-spacing-y-3">
        {/* Main container for the form */}
        <div>
          <label>Title</label>
          {/* Input field for the title */}
          <input
            className="border relative bg-gray-900 rounded-lg text-xs border-none w-[60%] h-[5vh] text-white left-[16%] top-[2vh]"
            value={title} // Sets the input value to the current title state
            onChange={(e) => setTitle(e.target.value)} // Updates the title state when input changes
          />
        </div>
        <div>
          <label>Description</label>
          {/* Textarea field for the description */}
          <textarea
            className="border relative text-white bg-gray-900 rounded-lg left-[10%] w-[60%] top-[8vh] h-[20vh]"
            value={description} // Sets the textarea value to the current description state
            onChange={(e) => setDescription(e.target.value)} // Updates the description state when input changes
          />
        </div>
        <div>
          <label>Tasks</label>
          {/* Button to add a new task */}
          <button
            type="button"
            onClick={() => setTasks([...tasks, { title: "", status: 0 }])} // Adds a new task to the tasks array
          >
            Add Task
          </button>
          {/* Loop to display each task */}
          {tasks.map((task, index) => (
            <div key={index}>
              <input
                className="border"
                value={task.title} // Sets the input value to the current task title
                onChange={(e) => {
                  const updated = [...tasks]; // Creates a copy of the tasks array
                  updated[index].title = e.target.value; // Updates the task title
                  setTasks(updated); // Sets the updated tasks array
                }}
              />
            </div>
          ))}
        </div>

        {/* Button to submit the form */}
        <button
          type="submit"
          className="bg-blue-500 relative top-[20%] left-[20%] w-[60%] text-white p-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}