import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Home = React.lazy(() => import("../pages/Home"));
const InsertFlight = React.lazy(() => import("../pages/InsertFlight"));
import ErrorPage from "../pages/ErrorPage";
//layouts
import WelcomeLayout from "../layouts/WelcomeLayout/WelcomeLayout";
import MainLayout from "../layouts/MainLayout/MainLayout";
// suspense
import SuspenseLoading from "../components/feedback/SuspenseLoading/SuspenseLoading";
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

        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <Register />
          </Suspense>
        ),
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
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "insert",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <InsertFlight />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
