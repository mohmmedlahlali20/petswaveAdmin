import { Users, ShoppingBag, DollarSign, Activity, Search, ChevronDown } from 'lucide-react';

export function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="flex items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <div className="flex items-center">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search..."
                                className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>
                </div>
            </header>
            <main className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {[ 
                        { title: "Total Users", value: "2,543", icon: <Users className="h-8 w-8 text-blue-500" /> },
                        { title: "Total Orders", value: "1,234", icon: <ShoppingBag className="h-8 w-8 text-green-500" /> },
                        { title: "Revenue", value: "$45,231", icon: <DollarSign className="h-8 w-8 text-yellow-500" /> },
                        { title: "Active Now", value: "321", icon: <Activity className="h-8 w-8 text-purple-500" /> }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                                </div>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Recent Orders</h2>
                            <button className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                Last 7 days
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    {['Order ID', 'Customer', 'Product', 'Amount', 'Status'].map((head, i) => (
                                        <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {[...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">#ORDER-{2547 + i}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">John Doe</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">Product {i + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">${(99 + i * 10).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
