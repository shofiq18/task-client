import {
    createBrowserRouter,
    
} from "react-router-dom";
import Home from "../Pages/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/LogIn";
import PrivateRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Home /></PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login />,
            }

        ]
    },
]);