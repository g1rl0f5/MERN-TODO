import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import TodoNavbar from "../components/TodoNavbar";

const ShowTodos = () => {
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const quotes = [
    "💪 Every accomplishment starts with the decision to try.",
    "🚶‍♂️ Small steps every day lead to big results.",
    "🔥 Stay focused and never give up!",
    "🪜 You don’t need to see the whole staircase, just take the first step.",
    "🌱 Progress, not perfection.",
    "🚀 Dream it. Believe it. Build it.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/todos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTodo(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load todo");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  return (
    <>
      <TodoNavbar />
      <div className="p-4 min-h-screen bg-gray-50">
        <Link to="/mytodo/userdashboard">
          <Button variant="secondary">Back</Button>
        </Link>

        <h1 className="text-3xl font-semibold my-6 text-gray-800">Todo Details</h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-2xl w-full max-w-xl p-6 bg-white shadow-md">
            <div className="my-3">
              <span className="text-lg font-semibold text-gray-600">Title:</span>{" "}
              <span className="text-gray-800">{todo.title}</span>
            </div>
            <div className="my-3">
              <span className="text-lg font-semibold text-gray-600">Completed:</span>{" "}
              <span className="text-gray-800">{todo.completed ? "Yes" : "No"}</span>
            </div>

            <div className="mt-6 p-4 bg-sky-50 border-l-4 border-sky-400 rounded shadow-sm text-gray-700 italic text-center">
              “{randomQuote}”
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowTodos;
