import { useEffect, useState } from "react";
import { Search, Edit, Trash2, PlusCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { addCategory, getAllCategory, removeCategory, updateCategory } from "../redux/Slice/categorySlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Category } from "../constant/type";

export default function CategoryList() {
    const { isLoading, error, categories } = useAppSelector((state) => state.category);
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [name, setName] = useState("");
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);





    useEffect(() => {
        const getCategory = async () => {
            try {
                await dispatch(getAllCategory());
            } catch (err) {
                console.error('Error fetching categories', err);
            }
        };
        getCategory();
    }, [dispatch]);

    const handleAddCategory = async () => {
        if (!name) return;
        try {
            await dispatch(addCategory(name)).unwrap();
            setName("");
            toast.success("Category added successfully!");
        } catch (err: any) {
            console.error('Error adding category', err);
            toast.error("Error adding category!");
        }
    };

    const handleRemoveCategory = async (categoryId: string) => {
        try {
            await dispatch(removeCategory(categoryId)).unwrap();
            toast.success("Category removed successfully!");
        } catch (err: any) {
            console.error('Error removing category', err);
            toast.error("Error removing category!");
        }
    };

    const handleEditCategory = (category: Category) => {
        setEditCategory(category);
        setName(category.name);
        setIsEditModalOpen(true);
    };

    const handleUpdateCategory = async () => {
        if (!name || !editCategory) return;
        try {
            await dispatch(updateCategory({ categoryId: editCategory._id, name })).unwrap();
            setIsEditModalOpen(false);
            setName("");
            setEditCategory(null);
            toast.success("Category updated successfully!");
        } catch (err: any) {
            console.error('Error updating category', err);
            toast.error("Error updating category!");
        }
    };

    const filteredCategory = categories.filter(Cat =>
        Cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 text-gray-900 dark:text-gray-100">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Pet Categories</h1>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Search Pets
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200
                  placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                    placeholder="Search by name..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Create New Category
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="category"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200
                  placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                    placeholder="Category name..."
                                />
                                <button
                                    onClick={handleAddCategory}
                                    className="mt-2 inline-flex items-center justify-center gap-2 w-full md:w-auto
                  bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 focus:outline-none
                  text-white font-medium px-4 py-2.5 rounded-lg shadow-sm
                  transition-all duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <PlusCircle className="h-5 w-5" />
                                    <span>Add Category</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {isLoading ? (
                            <span>Loading categories...</span>
                        ) : (
                            <>
                                Showing <span className="font-semibold">{filteredCategory.length}</span> of <span className="font-semibold">{categories.length}</span> categories
                            </>
                        )}
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                    {["Name", "Actions"].map((heading) => (
                                        <th
                                            key={heading}
                                            className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredCategory.length > 0 ? (
                                    filteredCategory.map((Cat) => (
                                        <tr
                                            key={Cat._id}
                                            className="hover:bg-gray-900 dark:hover:bg-gray-750 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {Cat.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => handleEditCategory(Cat)}
                                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150"
                                                        aria-label="Edit"
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveCategory(Cat._id)}
                                                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-150"
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                                            No categories found matching your search
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="Category name"
                        />
                        <div className="flex items-center justify-end space-x-3 mt-4">
                            <button
                                onClick={handleUpdateCategory}
                                className="bg-primary text-white px-4 py-2 rounded-lg"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
