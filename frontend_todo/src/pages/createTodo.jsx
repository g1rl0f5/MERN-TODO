import React, { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import TodoNavbar from "../components/TodoNavbar";
import { IoMdArrowBack } from "react-icons/io";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveTodo = async () => {
    if (!title.trim()) {
      toast.warn("Title is required!");
      return;
    }

    const data = { title, completed };
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/todos/create", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Todo created successfully!");
      navigate("/mytodo/userdashboard");
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Failed to create todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TodoNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/mytodo/userdashboard"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
            >
              <IoMdArrowBack className="text-xl" />
              Back
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">Create Todo</h2>
          </div>

          {loading && <Spinner />}

          <div className="space-y-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter todo title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="h-5 w-5 text-sky-600"
              />
              <label className="text-gray-700">Mark as Completed</label>
            </div>

            <button
              onClick={handleSaveTodo}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-md transition"
            >
              Save Todo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;
