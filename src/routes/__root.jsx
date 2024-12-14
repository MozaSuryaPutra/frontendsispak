import React from "react";
import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux"; // To access Redux state
import NavigationBar from "../components/NavBar/index.jsx";
import Sidebar from "../components/SideBar/index.jsx";

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // Get user from Redux

    // Check if current path starts with /admin and user has role_id 1
    const isAdminRoute =
      location.pathname.startsWith("/admin") && user?.role_id === 1;

    // Redirect non-admin users trying to access /admin routes
    // React.useEffect(() => {
    //   if (location.pathname.startsWith("/admin") && user?.role_id !== 1) {
    //     navigate({ to: "/" }); // Redirect to home or any other appropriate route
    //   }
    // }, [location, user, navigate]);

    return (
      <>
        {/* Sidebar - visible only for admin routes */}
        {isAdminRoute && <Sidebar />}

        {/* Navbar */}
        <NavigationBar />

        {/* Use Container or Container fluid based on the route */}
        {isAdminRoute ? (
          <Container>
            {/* Render the component for the admin path */}
            <Outlet />
          </Container>
        ) : (
          <Container fluid={true} className="p-0">
            {/* Render the component for non-admin routes */}
            <Outlet />
          </Container>
        )}

        {/* Debugging tool for router */}
        <TanStackRouterDevtools />

        {/* React Toastify */}
        <ToastContainer theme="colored" />
      </>
    );
  },
});
