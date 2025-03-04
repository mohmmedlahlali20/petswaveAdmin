import axios from "axios";
import { Pets } from "../../../constant/type";
import path from "../../../axios/path";


const addPetsApi = async (petData: Pets, images: File[]) => {
    try {
        const formData = new FormData();

        formData.append("name", petData.name);
        formData.append("gender", petData.gender);
        formData.append("age", petData.age.toString());
        formData.append("category", petData.category);
        formData.append("description", petData.description);
        formData.append("Prix", petData.Prix.toString());

        images.forEach((image) => {
            formData.append("images", image);
        });

        const res = await axios.post(`${import.meta.env.VITE_NEST_API_URL}pets/create`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return res.data;
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
