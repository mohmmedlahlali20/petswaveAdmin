import {Users, ShoppingBag, DollarSign, Activity, Search, ChevronDown} from 'lucide-react'

export function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">

            <header className="bg-white shadow">
                <div className="flex items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-bold">Dashboard</h1>


                    <div className="flex items-center">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"/>
                            <input
                                type="search"
                                placeholder="Search..."
                                className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Users</p>
                                <h3 className="text-2xl font-bold">2,543</h3>
                            </div>
                            <Users className="h-8 w-8 text-blue-500"/>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Orders</p>
                                <h3 className="text-2xl font-bold">1,234</h3>
                            </div>
                            <ShoppingBag className="h-8 w-8 text-green-500"/>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Revenue</p>
                                <h3 className="text-2xl font-bold">$45,231</h3>
                            </div>
                            <DollarSign className="h-8 w-8 text-yellow-500"/>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active Now</p>
                                <h3 className="text-2xl font-bold">321</h3>
                            </div>
                            <Activity className="h-8 w-8 text-purple-500"/>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Recent Orders</h2>
                            <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                                Last 7 days
                                <ChevronDown className="ml-1 h-4 w-4"/>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {[...Array(5)].map((_, i) => (
                                <tr key={i}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        #ORDER-{2547 + i}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        John Doe
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        Product {i + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${(99 + i * 10).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
    )
}