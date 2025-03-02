

import React, { FC } from 'react';
import { ArrowBigLeft, ArrowBigRight, X } from 'lucide-react';

interface AddPetPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPets: FC<AddPetPopupProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = React.useState(1);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-1/3 p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 transition">
            <X size={24} />
          </button>

          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">Add New Pet</h2>
          <hr className="mb-4 border-gray-300 dark:border-gray-600" />

          <div className="flex justify-between mb-6">
            <button
              onClick={handleBack}
              className={`p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentStep === 1}
            >
              <ArrowBigLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className={`p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition ${currentStep === 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentStep === 3}
            >
              <ArrowBigRight size={24} />
            </button>
          </div>

          {currentStep === 1 && (
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100 mb-4"
                placeholder="Enter pet name"
              />

              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Gender:</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100 mb-4"
              >
                <option value="">Select a gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Age (weeks):</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100 mb-4"
                placeholder="Enter pet age in weeks"
              />

              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Category:</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100 mb-4"
              >
                <option value="">Select a category</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>

              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Price ($):</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100 mb-4"
                placeholder="Enter pet price"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Upload Pet Images</h3>
              <input
                type="file"
                multiple
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100 mb-4"
              />
              <div className="grid grid-cols-6 gap-2 mt-4">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-md shadow-md"></div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Description:</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100 resize-none h-32"
                placeholder="Enter pet description..."
              />
              <button
                className="w-full mt-4 bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </div>
          )}

        </div>
      </div>
    )
  );
};

export default AddPets;
