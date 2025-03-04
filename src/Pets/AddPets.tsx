"use client"

import type React from "react"
import { type FC, useEffect, useState } from "react"
import { ArrowBigLeft, ArrowBigRight, X, Upload, Check } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch"
import { getAllCategory } from "../redux/Slice/categorySlice"
import { addPets } from "../redux/Slice/petSlice"
import type { Pets } from "../constant/type"

interface AddPetPopupProps {
  isOpen: boolean
  onClose: () => void
}

const AddPets: FC<AddPetPopupProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector((state) => state.category)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [currentStep, setCurrentStep] = useState(1)
  const [petData, setPetData] = useState<Pets>({
    name: "",
    gender: "",
    age: 0,
    category: "",
    images: [],
    description: "",
    Prix: 0,
    isAvailable: true,
  })

  const [imageFiles, setImageFiles] = useState<File[]>([])

  useEffect(() => {
    dispatch(getAllCategory())
  }, [dispatch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPetData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPetData((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }))
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value

    setPetData((prev) => ({
      ...prev,
      category: categoryId,
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return

    const files = Array.from(event.target.files)
    const newImageUrls = files.map((file) => URL.createObjectURL(file))

    setImageFiles((prev) => [...prev, ...files])

    setPetData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImageUrls],
    }))
  }

  const removeImage = (index: number) => {
    setPetData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const validateCurrentStep = (): boolean => {
    setError(null)

    if (currentStep === 1) {
      if (!petData.name.trim()) {
        setError("Pet name is required")
        return false
      }
      if (!petData.gender) {
        setError("Please select a gender")
        return false
      }
      if (petData.age <= 0) {
        setError("Age must be greater than 0")
        return false
      }
      if (!petData.category) {
        setError("Please select a category")
        return false
      }
      if (petData.Prix <= 0) {
        setError("Price must be greater than 0")
        return false
      }
    } else if (currentStep === 2) {
      if (petData.images.length === 0) {
        setError("Please upload at least one image")
        return false
      }
    } else if (currentStep === 3) {
      if (!petData.description.trim()) {
        setError("Description is required")
        return false
      }
    }

    return true
  }

  const goToNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const addNewPets = async () => {
    if (!validateCurrentStep()) return;

    try {
      setIsSubmitting(true);
      setError(null);

      await dispatch(addPets({ petData, images: imageFiles })).unwrap();
      onClose();
    } catch (err: any) {
      setError(err.message || "Error adding pet");
      console.error("Error adding pet:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (petData.name || petData.description || petData.images.length > 0 || petData.Prix > 0) {
      if (window.confirm("Are you sure you want to close? Any unsaved changes will be lost.")) {
        onClose()
      }
    } else {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">Add New Pet</h2>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Basic Info</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Images</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Description</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            aria-label="Previous step"
          >
            <ArrowBigLeft size={24} className="text-gray-700 dark:text-gray-300" />
          </button>

          {currentStep < 3 ? (
            <button
              onClick={goToNextStep}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next step"
            >
              <ArrowBigRight size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          ) : (
            <div></div>
          )}
        </div>


        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}


        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="pet-name" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Name:
              </label>
              <input
                id="pet-name"
                type="text"
                name="name"
                value={petData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter pet name"
              />
            </div>

            <div>
              <label htmlFor="pet-gender" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Gender:
              </label>
              <select
                id="pet-gender"
                name="gender"
                value={petData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select a gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="pet-age" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Age (weeks):
              </label>
              <input
                id="pet-age"
                type="number"
                name="age"
                value={petData.age || ""}
                onChange={handleNumberInputChange}
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter pet age"
              />
            </div>

            <div>
              <label htmlFor="pet-category" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Category:
              </label>
              <select
                id="pet-category"
                name="category"
                value={petData.category} // Store category ID here
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select a category</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="pet-price" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Price ($):
              </label>
              <input
                id="pet-price"
                type="number"
                name="Prix"
                value={petData.Prix || ""}
                onChange={handleNumberInputChange}
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter pet price"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Upload Pet Images</h3>

            <div className="space-y-2">
              {petData.images.map((image, index) => (
                <div key={index} className="relative inline-block">
                  <img src={image} alt={`Image ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
                  <button
                    type="button"
                    className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
                    onClick={() => removeImage(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label
                htmlFor="pet-images"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-500"
              >
                <Upload size={20} className="mr-2" />
                Upload Images
              </label>
              <input
                id="pet-images"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <div>
              <label
                htmlFor="pet-description"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
              >
                Description:
              </label>
              <textarea
                id="pet-description"
                name="description"
                value={petData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter pet description"
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          {currentStep === 3 ? (
            <button
              onClick={addNewPets}
              disabled={isSubmitting}
              className={`p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={goToNextStep}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddPets
