import { createBrowserRouter } from "react-router-dom";
import DashboardLayouts from "../layouts/Layouts.tsx";
import {
    Dashboard
} from "../pages";
import {
    LoginComponent
} from "../auth";
import { 
    ListPets
 } from "../Pets";
import { 
    CategoryList 
} from "../category";
import { NotFoundPets } from "../pages/notFound.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayouts />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/Pets',
                element: <ListPets />
            },
            {
                path: '/Category',
                element: <CategoryList />
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPets/>
    },
    {
        path: '/login',
        element: <LoginComponent />
    }
])


export default router;