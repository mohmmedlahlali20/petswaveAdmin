import {createBrowserRouter} from "react-router-dom";
import DashboardLayouts from "../layouts/Layouts.tsx";
import {
    Dashboard
} from "../pages";
import {
    LoginComponent
} from "../auth";
import {ListPets} from "../Pets";


const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayouts/>,
        children: [
            {
                path: '/',
                element: <Dashboard/>
            },
            {
                path: '/Pets',
                element: <ListPets/>
            }
        ]
    },
    {
        path: '*',
        element: <h1>Not Found</h1>
    },
    {
        path: '/login',
        element: <LoginComponent/>
    }
])


export default router;