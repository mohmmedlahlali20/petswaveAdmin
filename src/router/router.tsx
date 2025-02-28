import {createBrowserRouter} from "react-router-dom";
import DashboardLayouts from "../layouts/Layouts.tsx";
import {
    Dashboard
} from "../pages";


const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayouts/>,
        children: [
            {
                path: '/',
                element: <Dashboard/>
            }
        ]
    }
])


export default router;