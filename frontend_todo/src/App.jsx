import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import UserRegister from "./pages/userRegister";
import UserDashboard from "./pages/userDashboard";
import CreateTodo from "./pages/createTodo";
import ShowTodos from "./pages/showTodos";
import EditTodo from "./pages/editTodo";
import DeleteTodo from "./pages/deleteTodo";
function App() {
  return (
    <div>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mytodo/userlogin" element={<LoginPage />} />
          <Route path="/mytodo/userregister" element={<UserRegister />} />
          <Route path="/mytodo/userdashboard" element={<UserDashboard />} />
          <Route path="/mytodo/createtodo" element={<CreateTodo />} />
          <Route path="/mytodo/showtodos/:id" element={<ShowTodos />} /> 
          <Route path="/mytodo/edittodo/:id" element={<EditTodo />} />
          <Route path="/mytodo/deletetodo/:id" element={<DeleteTodo />} />
      
        
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;