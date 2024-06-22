import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Signup from "./components/Auth/Signup.jsx";
// import Login from "./components/Auth/Login.jsx";
// import Contact from "./components/Contact/Contact.jsx";
// import Team from "./components/Team/Team.jsx";
// import Layout from "./components/Layout.jsx";
// import About from "./components/About/About.jsx";
// import AdminTeam from "./components/Admin/Team/AdminTeam.jsx";
// import NotFound404 from "./components/NotFound/NotFound404.jsx";
// import BusinessCenter from "./components/projects/BusinessCenter/BusinessCenter.jsx";
// import Medical from "./components/projects/medical/Medical.jsx";
import Home from "./components/Home/Home.jsx";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      // element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        // {
        //   path: "/signup",
        //   element: <Signup />,
        // },
        // {
        //   path: "/login",
        //   element: <Login />,
        // },
        // {
        //   path: "/contact",
        //   element: <Contact />,
        // },
        // {
        //   path: "/team",
        //   element: <Team />,
        // },
        // {
        //   path: "/about",
        //   element: <About />,
        // },
        // {
        //   path: "admin/team",
        //   element: <AdminTeam />,
        // },
        // {
        //   path: "/projects/bushnaq-businesses-center",
        //   element: <BusinessCenter />,
        // },
        // {
        //   path: "/projects/bushnaq-medical",
        //   element: <Medical />,
        // },
        // {
        //   path: "*",
        //   element: <NotFound404 />,
        // },
      ],
    },
  ],
  { basename: "/bushnaq-group/" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
