import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import InsertFlight from "../pages/InsertFlight";
import Home from "../pages/Home";
//layouts
import WelcomeLayout from "../layouts/WelcomeLayout/WelcomeLayout";
import MainLayout from "../layouts/MainLayout/MainLayout";
// guards
import Visitor from "../components/guards/Visitor";
import Authenticated from "../components/guards/Authenticated";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Visitor>
        <WelcomeLayout />
      </Visitor>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/home",
    element: (
      <Authenticated>
        <MainLayout />
      </Authenticated>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: "insert",
        element: <InsertFlight />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
