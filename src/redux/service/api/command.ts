import path from "../../../axios/path"


const GetAllCommandesApi = async () => {
    const res = await path.get('commandes/GetAllCommandes')
    return res.data.allCommandes
}


export{
    GetAllCommandesApi
}