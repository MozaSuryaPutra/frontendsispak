import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  FaArrowLeft,
  FaCar,
  FaHome,
  FaCogs,
  FaWrench,
  FaDisease,
  FaHeadSideCough,
  FaRegFlushed,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Protected from "../../components/Auth/Protected";

const SideBar = () => {
  const location = useLocation();
  const { user, token } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  // If not authenticated or is mobile, return null
  if (!token || isMobile || user === null) {
    return null;
  }

  // Check if the user has role 1
  const isAdmin = user.role_id === 1;

  // Render the sidebar only for admin users
  return location.pathname.startsWith("/admin") && isAdmin ? (
    <Protected roles={[1]}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            background: "#1DCC75",
            width: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "fixed",
            height: "100vh",
            color: "#fff",
            zIndex: "3",
          }}
        >
          <Button
            className="me-2"
            style={{
              marginLeft: "8px",
              marginTop: "10px",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              border: "none",
            }}
            onClick={() => {
              navigate({ to: "/" });
            }}
          >
            <FaArrowLeft size={24} />
          </Button>

          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link
                to="/admin"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "10px 0",
                  color: isActive("/admin") ? "#0D28A6" : "#fff",
                  backgroundColor: isActive("/admin")
                    ? "#D9EFFF"
                    : "transparent",
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "100%",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <FaHome size={24} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/penyakitgejala"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "10px 0",
                  color: isActive("/admin/cars") ? "#0D28A6" : "#fff",
                  backgroundColor: isActive("/admin/cars")
                    ? "#D9EFFF"
                    : "transparent",
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "100%",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <FaRegFlushed size={24} />
                <span>Cf Diagnosis</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/gejala"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "10px 0",
                  color: isActive("/admin/models") ? "#0D28A6" : "#fff",
                  backgroundColor: isActive("/admin/models")
                    ? "#D9EFFF"
                    : "transparent",
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "100%",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <FaHeadSideCough size={24} />
                <span>Gejala</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/penyakit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "10px 0",
                  color: isActive("/admin/types") ? "#0D28A6" : "#fff",
                  backgroundColor: isActive("/admin/types")
                    ? "#D9EFFF"
                    : "transparent",
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "100%",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <FaDisease size={24} />
                <span>Penyakit</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Protected>
  ) : null;
};

export default SideBar;
