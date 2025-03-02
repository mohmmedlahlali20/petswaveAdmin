import path from "../../../axios/path";




const getCategoryApi = async () => {
    const res = await path.get('category/GetAll');
    return res.data
}


const createCategoryApi = async (name: string) =>{
    const res = await path.post('category/create_Category',name)
    return res.data
}


export {
    getCategoryApi,
    createCategoryApi
}