import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegisteration = async (e) => {
    e.preventDefault();
    try {

      console.log("Sending data to server:", username, password); 

      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });

      console.log("Data sent successfully");

      toast.success("Registered Successfully", { position: "top-right" });
      navigate("/mytodo/userlogin");
    } catch (error) {
      console.error("Registration Failed", error);
      toast.error("User registration failed", { position: "top-right" });
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 regback">
      <div className="text-center reg-login r-lpages">
        <h2>Register here...</h2>
        <Form onSubmit={handleRegisteration}>
          <FloatingLabel controlId="floatingInput" label="Username">
            <Form.Control
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="my-3"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="my-3"
            />
          </FloatingLabel>
          <Button type="submit" variant="primary" className="mx-2">
            submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UserRegister;
