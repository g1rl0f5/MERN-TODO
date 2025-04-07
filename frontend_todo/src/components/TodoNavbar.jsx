import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa"; // Icon for logout

function TodoNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      toast.success("👋 Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("⚠️ Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar
      expand="lg"
      className="bg-light shadow-sm px-3 py-2 border-bottom"
      style={{ fontFamily: "Segoe UI, sans-serif" }}
    >
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1.6rem",
            color: "#0d6efd",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          📝 TU_DOOS
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button
            variant="outline-danger"
            onClick={handleLogout}
            className="d-flex align-items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TodoNavbar;
