import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDetails from "./pages/StudentDetails";
import Attendance from "./pages/Attendance";
import Calculator from "./pages/GraceMarkCalculator";
import Home from "./pages/Home";
import RecPage from "./pages/recpage1"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Authorization from "./pages/Authorization"
import Visualization from "./pages/Visualization"
import "./style.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/marks",
        element: <StudentDetails />,
      },
      {
        path: "",
        element: <Home />,
      },
      // {
      //   path: "",
      //   element: <Authorization />,
      // },
      {
        path: "/rec/:id",
        element: <RecPage />,
      },
      {
        path: "/attendance",
        element: <Attendance />,
      },
      {
        path: "/calculator",
        element: <Calculator />,
      },
      {
        path: "/visualization",
        element: <Visualization />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
  path: "/rec",
  element: <RecPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;