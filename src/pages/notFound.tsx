export function NotFoundPets() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h1 className="text-6xl font-bold text-gray-700 dark:text-gray-300">404</h1>
            <p className="text-xl mt-2 text-gray-600 dark:text-gray-400">Oops! Pets not found.</p>
            <p className="text-md mt-1 text-gray-500 dark:text-gray-400">The pets you're looking for do not exist or have been removed.</p>
            <a 
                href="/" 
                className="mt-6 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-400 transition"
            >
                Go Back Home
            </a>
        </div>
    );
}
