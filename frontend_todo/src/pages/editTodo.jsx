import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams,Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";

import TodoNavbar from "../components/TodoNavbar"


const EditTodo = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTitle(response.data.title);
        setCompleted(response.data.completed);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch todo");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleEditTodo = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const data = { title, completed };
      await axios.put(`http://localhost:5000/api/todos/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Todo updated successfully!");
      navigate("/mytodo/userdashboard");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.status === 401
          ? "Unauthorized: Please log in again"
          : "Error updating todo"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <TodoNavbar/>
     <div className="p-4">
            <Link to="/mytodo/userdashboard">
            <Button variant="secondary" className="mb-4">Back</Button>
            </Link>
      <h1 className="text-3xl mb-6 text-sky-700 font-bold">Edit Todo</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Completed</label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-5 w-5"
          />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleEditTodo}>
          Save Changes
        </button>
      </div>
    </div>
    </>
   
  );
};

export default EditTodo;    