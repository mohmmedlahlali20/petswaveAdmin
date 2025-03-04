"use client";

import { Home, Settings, Users, ChartBarStacked, BarChart, Mail, Bell, Calendar, HelpCircle, Menu, X, PawPrint} from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "../hooks/useAppDispatch";
import Default from '../assets/default.png'

type NavItem = {
    title: string;
    href: string;
    icon: React.ElementType;
};
const navItems: NavItem[] = [
    { title: "Dashboard", href: "/", icon: Home },
    { title: "Analytics", href: "/analytics", icon: BarChart },
    { title: "Pets", href: "/Pets", icon: PawPrint },
    { title: "Customers", href: "/users", icon: Users },
    { title: "Category", href: "/Category", icon: ChartBarStacked },
    { title: "Calendar", href: "/calendar", icon: Calendar },
    { title: "Notifications", href: "/notifications", icon: Bell },
    { title: "Settings", href: "/settings", icon: Settings },
    { title: "Help & Support", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const {user, isLoading, error}= useAppSelector((state) => state.User)

    console.log('====================================');
    console.log(user);
    console.log('====================================');

    return (
        <>
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <button
                onClick={() => setMobileOpen(true)}
                className="fixed top-4 left-4 z-50 rounded-md p-2 bg-blue-600 text-white shadow-md md:hidden"
                aria-label="Open sidebar"
            >
                <Menu className="h-6 w-6" />
            </button>

            <aside
                className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out shadow-lg z-50
                    ${collapsed ? "w-16" : "w-64"} 
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className={`text-lg font-bold text-gray-900 dark:text-white transition-all duration-300 ${collapsed ? "hidden" : "block"}`}>
                            PetsWAve
                        </h2>

                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hidden md:block"
                            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
                        </button>

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white md:hidden"
                            aria-label="Close sidebar"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="space-y-1 px-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors 
                                            text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white 
                                            ${collapsed ? "justify-center" : ""}
                                        `}
                                    >
                                        <item.icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                                        <span className={collapsed ? "hidden" : "block"}>{item.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                                <img src={user?.avatar?? Default} alt="Default" />
                            </div>
                            <div className={`ml-3 text-gray-900 dark:text-white ${collapsed ? "hidden" : "block"}`}>
                                <p className="text-sm font-medium">{user?.firstName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
