import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { GettingUsers } from "../redux/Slice/userSlice";
import { FiSearch } from "react-icons/fi";

export default function GetUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const {users} = useAppSelector((state) => state.User)
    console.log('====================================');
    console.log(users);
    console.log('====================================');
    const dispatch = useAppDispatch()


    useEffect(() => {
        const getUsersList = async () => {
            await dispatch(GettingUsers())
        }
        getUsersList()
    }, [])






    return (
        <div className="min-h-screen p-12 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">Users List</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Search by Name
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                id="search"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 pl-10"
                                placeholder="Search pets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FiSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" size={18} />
                        </div>
                    </div>




                </div>
            </div>


            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Showing <span className="font-semibold">{users.length} pets </span>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-600 dark:bg-gray-700 text-white">
                        <tr>
                            {["firstName", "lastName", "email","role", "isVerified",  "avatar"].map((heading) => (
                                <th
                                    key={heading}
                                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="even:bg-gray-50 dark:even:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {user.firstName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                        {user.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                        {user.isVerified ? 'oui' : 'non'}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                        {user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.firstName}
                                                className="w-16 h-16 object-cover rounded-md border border-gray-200 dark:border-gray-700"

                                            />
                                        ) : (
                                            <span className="text-gray-400">No image</span>
                                        )}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                                >
                                    No pets found matching your filters. Try adjusting your search criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


        </div>
    );
}
