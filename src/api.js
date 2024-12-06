import axios from "axios"; // Import the Axios library to handle HTTP requests

// Base URL for the API
const API_URL = "https://greenvelvet.alwaysdata.net/pfc";

// Token for authentication (replace with your own token)
const token = "dfb65887cf0a4e3b9562d9cf6ea888fd3191f48c";

// Create an Axios instance for API calls
export const api = axios.create({
  baseURL: API_URL, 
  headers: { token }, 
});

// Function to fetch all checklists from the API
export const getAllChecklists = async () => {
  const response = await api.get("/checklists");
  return response.data.response; 
};

// Function to add a new checklist
export const addChecklist = async (title, description, todos) => {
  const response = await api.post("/checklist/add", {
    title, 
    description, 
    todo: todos,
  });
  return response.data.id; 
};

// Function to delete a checklist by ID
export const deleteChecklist = async (id) => {
  await api.get(`/checklist/delete?id=${id}`); // Send a GET request to delete the checklist with the specified ID
};

// Function to update an existing checklist
export const updateChecklist = async (id, title, description, todos) => {
  await api.post("/checklist/update", {
    
    id,
    title, 
    description,
    todo: todos, 
  });
};

// Function to fetch a single checklist by ID
export const getChecklist = async (id) => {
  const response = await api.get(`/checklist?id=${id}`); 
  return response.data;
};