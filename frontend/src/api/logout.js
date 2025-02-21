import {API_Routes, API_Headers} from "./api_base"


const headers = API_Headers

export const logout = async (token) => {
    alert("running logout checking if token")
    if(!token){
        return {status: 400, message: "token not provided"}
    }

    headers["Authorization"] = `token ${token}`;

    try {
        alert("running logout")
        const res = await fetch(API_Routes.logout, {
            headers: headers
        })
    
        const res_data = await res.json()

        if(res_data.status == "ok"){
            return {status: 200, data: res_data}
        }

        return {status: 400, message:"something wrong..."}
        
    } catch (error) {
        console.log(error, "while logout")
    }

}