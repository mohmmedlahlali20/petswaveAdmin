"use client";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import AddPets from "./AddPets";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { getPets } from "../redux/Slice/petSlice";

export default function ListPets() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [genderFilter, setGenderFilter] = useState("All");
    const { isLoading, error, pets } = useAppSelector((state) => state.pet)
    console.log('====================================');
    console.log(pets);
    console.log('====================================');
    const dispatch = useAppDispatch()


    useEffect(() => {
        const getPetsList = async () => {
            await dispatch(getPets())
        }
        getPetsList()
    }, [])






    const handleAddPetClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    const filteredPets = pets.filter((pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (genderFilter === "All" || pet.gender === genderFilter)
    );

    return (
        <div className="min-h-screen p-12 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">Pets List</h1>

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

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Filter by Gender
                        </label>
                        <div className="relative mt-1">
                            <select
                                id="gender"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 pl-10"
                                value={genderFilter}
                                onChange={(e) => setGenderFilter(e.target.value)}
                            >
                                <option value="All">All Genders</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <IoFilterSharp className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" size={18} />
                        </div>
                    </div>

                    <div className="text-end p-6 mt-3">
                        <button
                            onClick={handleAddPetClick}
                            className="bg-indigo-600 text-white font-semibold rounded-md py-2 px-4 shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                            Add new Pets
                        </button>
                    </div>
                </div>
            </div>


            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Showing <span className="font-semibold">{filteredPets.length}</span> of {pets.length} pets
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-600 dark:bg-gray-700 text-white">
            <tr>
                {["Name", "Gender", "Category", "Age", "Price", "Description", "Image"].map((heading) => (
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
            {filteredPets.length > 0 ? (
                filteredPets.map((pet) => (
                    <tr 
                        key={pet._id} 
                        className="even:bg-gray-50 dark:even:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {pet.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {pet.gender }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {pet.category?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {pet.age ? `${pet.age} ${pet.age === 1 ? "week" : "weeks"}` : "Unknown"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                            ${pet.Prix?.toFixed(2) }
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                            {pet.description ? (
                                <span title={pet.description}>
                                    {pet.description.slice(0, 30)}...
                                </span>
                            ) : "No description"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                            {pet.images && pet.images.length > 0 ? (
                                <img 
                                    src={pet.images[0]} 
                                    alt={pet.name} 
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
            {isPopupOpen && (
                <AddPets isOpen={isPopupOpen} onClose={handleClosePopup} />
            )}

        </div>
    );
}
