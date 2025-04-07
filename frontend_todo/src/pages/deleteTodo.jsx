import React, { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams,Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import TodoNavbar from "../components/TodoNavbar"


const DeleteTodo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleTodoDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/todos/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Todo deleted successfully");
      navigate("/mytodo/userdashboard");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.status === 401
          ? "Unauthorized: Please login again"
          : "Failed to delete todo"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <TodoNavbar/>
           <Link to="/mytodo/userdashboard">
              <Button variant="secondary">Back</Button>
            </Link>
      <h1 className="text-3xl my-4">Delete pls</h1>
      {loading && <Spinner />}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Delete this todo?</h3>
        
        <Button
          // className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleTodoDelete}
           variant="danger"
        >
          Yes
        </Button>
        <Link to="/mytodo/userdashboard">
              <Button variant="secondary">cancel</Button>
        </Link>
      </div>
    </div>
  );
};

export default DeleteTodo;