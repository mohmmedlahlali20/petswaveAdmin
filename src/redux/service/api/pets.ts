import axios from "axios";
import { Pets } from "../../../constant/type";
import path from "../../../axios/path";

const addPetsApi = async (petData: Pets) => {
    try {
        const formData = new FormData();

        Object.entries(petData).forEach(([key, value]) => {
            if (key === "images" && Array.isArray(value)) {
                value.forEach((image) => formData.append("images", image));
            } else {
                formData.append(key, value as string | Blob);
            }
        });

        const res = await axios.post("pets/create", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.status === 201) {
            return res.data;
        } else {
            throw new Error("Failed to add pet");
        }
    } catch (err: any) {
        console.error("Error adding pet:", err);
        throw new Error(err.response?.data?.message || err.message || "Error adding pet");
    }
};


const getPetsApi = async () => {
    const res = await path.get("pets/findAllForAdmin");
    return res.data.pets || [];
}


export {
    addPetsApi,
    getPetsApi
}
