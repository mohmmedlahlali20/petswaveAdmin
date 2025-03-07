import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { GetAllCommandes } from '../redux/Slice/commandSlice';
import { FiSearch } from 'react-icons/fi';
import { Status } from '../constant/type';

export default function Commands() {
    const [searchTerm, setSearchTerm] = useState('');
    const { commands } = useAppSelector((state) => state.command);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(GetAllCommandes());
    }, []);

    const getStatusColor = (status: Status) => {
        switch (status) {
            case Status.Pending:
                return 'text-yellow-800';
            case Status.InProgress:
                return ' text-green-800';
            case Status.Completed:
                return ' text-blue-800';
            case Status.Cancelled:
                return 'text-red-800';
            default:
                return ' text-gray-800';
        }
    };

    const getStatusText = (status: Status) => {
        switch (status) {
            case Status.Pending:
                return 'Pending';
            case Status.InProgress:
                return 'En cours';
            case Status.Completed:
                return 'Livré';
            case Status.Cancelled:
                return 'Annulé';
            default:
                return status;
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">Liste des Commandes</h1>

                <div className="flex items-center mb-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            id="search"
                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 pl-10"
                            placeholder="Rechercher une commande..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" size={18} />
                    </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Affichage de <span className="font-semibold">{commands.length} commandes</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-max bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                {['Prénom', 'Nom', 'Total', 'Statut', 'Date'].map((heading) => (
                                    <th key={heading} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                            {commands.length > 0 ? (
                                commands.map((command) => (
                                    <tr
                                        key={command._id}
                                        className="even:bg-gray-50 dark:even:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {command.userId?.firstName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {command.userId?.lastName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {command.totalAmount} MAD
                                        </td>
                                        <td className={`px-6 py-4 text-sm  ${getStatusColor(command.status)}`}>
                                            {getStatusText(command.status)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {new Date(command.orderDate).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                        Aucune commande trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
