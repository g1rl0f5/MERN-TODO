import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import TodoNavbar from "../components/TodoNavbar";

function UserDashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/todos/getall", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTodos(response.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch todos");
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <TodoNavbar />
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Your Space</h1>
          <Link to="/mytodo/createtodo">
            <MdOutlineAddBox className="text-sky-800 text-4xl hover:scale-110 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md bg-white">
            <table className="min-w-full text-sm text-center border-separate border-spacing-y-2">
              <thead className="bg-blue-100 sticky top-0">
                <tr>
                  <th className="p-3 border border-slate-300">No</th>
                  <th className="p-3 border border-slate-300">Title</th>
                  <th className="p-3 border border-slate-300 max-md:hidden">Completed</th>
                  <th className="p-3 border border-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.length > 0 ? (
                  todos.map((todo, index) => (
                    <tr
                      key={todo._id}
                      className="hover:bg-gray-50 transition-colors bg-white"
                    >
                      <td className="p-3 border border-slate-200">{index + 1}</td>
                      <td className="p-3 border border-slate-200">{todo.title}</td>
                      <td className="p-3 border border-slate-200 max-md:hidden">
                        {todo.completed ? "✅" : "❌"}
                      </td>
                      <td className="p-3 border border-slate-200">
                        <div className="flex justify-center gap-x-4 text-xl">
                          <Link to={`/mytodo/showtodos/${todo._id}`}>
                            <BsInfoCircle className="text-green-600 hover:scale-110 transition-transform" />
                          </Link>
                          <Link to={`/mytodo/edittodo/${todo._id}`}>
                            <AiOutlineEdit className="text-yellow-500 hover:scale-110 transition-transform" />
                          </Link>
                          <Link to={`/mytodo/deletetodo/${todo._id}`}>
                            <MdOutlineDelete className="text-red-600 hover:scale-110 transition-transform" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-4 text-gray-500 border border-slate-300"
                    >
                      No Todos available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default UserDashboard;
