import path from "../../../axios/path.ts";


const loginApi = async ({email, password}:{email:string, password: string}) => {
    const  login = await path.post('auth/login', {email, password})
    return login.data
}



export {
    loginApi
}