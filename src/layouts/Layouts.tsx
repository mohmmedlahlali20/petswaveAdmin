import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useAppSelector } from "../hooks/useAppDispatch.ts";
import { useEffect } from "react";

export default function DashboardLayouts() {
    const { isAuthenticated } = useAppSelector((state) => state.User)
    const router = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            console.log("User is not authenticated!");
            router('/login')
        }
    }, [isAuthenticated]);
    return (

        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

            <Sidebar/>
            <div className="flex-grow bg-gray-100 dark:bg-gray-800 rounded-l-lg shadow-lg overflow-hidden ml-5">

                <main className="flex-grow p-6 md:p-8">
                    <Outlet />
                </main>
                {/* <Footer /> */}
            </div>
        </div>

    )
}
