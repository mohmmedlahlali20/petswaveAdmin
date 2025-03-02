import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function CategoryList() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className="min-h-screen p-12 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
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

        </div>
    )
}
