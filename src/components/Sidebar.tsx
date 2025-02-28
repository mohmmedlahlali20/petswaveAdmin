"use client"

import { Home, Settings, Users, ShoppingCart, BarChart, Mail, Bell, Calendar, HelpCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'

type NavItem = {
    title: string
    href: string
    icon: React.ElementType
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/",
        icon: Home,
    },
    {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart,
    },
    {
        title: "Products",
        href: "/products",
        icon: ShoppingCart,
    },
    {
        title: "Customers",
        href: "/customers",
        icon: Users,
    },
    {
        title: "Messages",
        href: "/messages",
        icon: Mail,
    },
    {
        title: "Calendar",
        href: "/calendar",
        icon: Calendar,
    },
    {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
    {
        title: "Help & Support",
        href: "/help",
        icon: HelpCircle,
    },
]

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile toggle button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed top-4 left-4 z-40 rounded-md p-2 bg-primary text-primary-foreground md:hidden"
                aria-label="Open sidebar"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full bg-card border-r border-border transition-all duration-300 ease-in-out ${collapsed ? "w-16" : "w-64"
                    } ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <h2 className={`font-bold text-xl ${collapsed ? "hidden" : ""}`}>App Name</h2>
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-1.5 rounded-md bg-secondary text-secondary-foreground hidden md:block"
                            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            {collapsed ? (
                                <Menu className="h-4 w-4" />
                            ) : (
                                <X className="h-4 w-4" />
                            )}
                        </button>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="p-1.5 rounded-md bg-secondary text-secondary-foreground md:hidden"
                            aria-label="Close sidebar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="space-y-1 px-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${item.href === "/" ? "bg-accent text-accent-foreground" : ""
                                            }`}
                                    >
                                        <item.icon className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                                        <span className={collapsed ? "hidden" : ""}>{item.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-border">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                <span className="text-sm font-medium">JD</span>
                            </div>
                            <div className={`ml-3 ${collapsed ? "hidden" : ""}`}>
                                <p className="text-sm font-medium">John Doe</p>
                                <p className="text-xs text-muted-foreground">john@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className={`min-h-screen transition-all duration-300 ease-in-out ${collapsed ? "md:pl-16" : "md:pl-64"
                } pt-16 md:pt-0`}>
                <div className="container p-4">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    <p>Main content goes here</p>
                </div>
            </main>
        </>
    )
}