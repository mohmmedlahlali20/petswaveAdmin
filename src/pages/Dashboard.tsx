import { Users, ShoppingBag, DollarSign, Search, Cat } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useEffect } from 'react';
import { GettingUsers } from '../redux/Slice/userSlice';
import { GetAllCommandes } from '../redux/Slice/commandSlice';
import { getPets } from '../redux/Slice/petSlice';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Dashboard() {
    const { users } = useAppSelector((state) => state.User);
    const { commands } = useAppSelector((state) => state.command);
    const { pets } = useAppSelector((state) => state.pet);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getusers = async () => {
            await dispatch(GettingUsers());
            await dispatch(GetAllCommandes());
            await dispatch(getPets());
        };
        getusers();
    }, [dispatch]);

    const totalAmount = commands.reduce((sum, command) => sum + (command.totalAmount || 0), 0);
    const availablePets = pets.filter((pet) => pet.isAvailable).length;
    const unavailablePets = pets.filter((pet) => !pet.isAvailable).length;
    const verifiedUsers = users.filter((user) => user.isVerified).length;
    const unverifiedUsers = users.filter((user) => !user.isVerified).length;

    const userVerificationData = [
        { name: "Verified", value: verifiedUsers },
        { name: "Unverified", value: unverifiedUsers }
    ];
    const petAvailabilityData = [
        { name: "Available", value: availablePets },
        { name: "Unavailable", value: unavailablePets }
    ];
    const revenueData = [
        { name: "Revenue", value: totalAmount },
        { name: "No Revenue", value: totalAmount === 0 ? 1 : 0 }
    ];

    const COLORS = {
        users: ["#4CAF50", "#FF5733"],
        pets: ["#2196F3", "#F44336"],
        revenue: ["#FFC107", "#9E9E9E"]
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="search"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: "Total Users", value: users.length, icon: <Users className="h-6 w-6 text-blue-500" /> },
                        { title: "Verified Users", value: verifiedUsers, icon: <Users className="h-6 w-6 text-green-500" /> },
                        { title: "Unverified Users", value: unverifiedUsers, icon: <Users className="h-6 w-6 text-red-500" /> },
                        { title: "Total Orders", value: commands.length, icon: <ShoppingBag className="h-6 w-6 text-green-500" /> },
                        { title: "Revenue", value: `MAD ${totalAmount.toLocaleString()}`, icon: <DollarSign className="h-6 w-6 text-yellow-500" /> },
                        { title: "Total Pets", value: pets.length, icon: <Cat className="h-6 w-6 text-purple-500" /> },
                        { title: "Available Pets", value: availablePets, icon: <Cat className="h-6 w-6 text-green-500" /> },
                        { title: "Unavailable Pets", value: unavailablePets, icon: <Cat className="h-6 w-6 text-red-500" /> }
                    ].map((stat, i) => (
                        <div 
                            key={i} 
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.title}</p>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                                </div>
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">User Verification</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={userVerificationData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}`}
                                        labelLine={true}
                                    >
                                        {userVerificationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS.users[index % COLORS.users.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                                    <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ paddingLeft: '20px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Pet Availability</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={petAvailabilityData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}`}
                                        labelLine={true}
                                    >
                                        {petAvailabilityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS.pets[index % COLORS.pets.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                                    <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ paddingLeft: '20px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Revenue Overview</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={revenueData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        dataKey="value"
                                        label={({ name, value }) => name === "Revenue" ? `${name}: MAD ${value.toLocaleString()}` : name}
                                        labelLine={true}
                                    >
                                        {revenueData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS.revenue[index % COLORS.revenue.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                        formatter={(value, name) => name === "Revenue" ? [`MAD ${value.toLocaleString()}`, name] : [value, name]}
                                    />
                                    <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ paddingLeft: '20px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div> */}
                </div>
            </main>
        </div>
    );
}