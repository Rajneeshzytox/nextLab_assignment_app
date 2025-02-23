import { API_Routes, API_Headers } from "../api_base";


export const verifyDownload = async (user_id, app_id) => {

    if(!user_id || !app_id){
        return {status: 400, message:"Enter both user_id & app_id"}
    }

    const data = {
        user_id: user_id,
        app_id: app_id
    }
    // console.log(data)

    const res = await fetch(API_Routes.verify, {
        method: 'POST',
        headers: API_Headers,
        body: JSON.stringify(data)
    })

    const res_data = await res.json()

    if(res.ok & res_data.status == "ok"){
        return {status: 200, message: res_data.message}
    }

    // assign failed due 
    if(res.ok & res_data.status == "not"){
        return {status: 400, message: res_data.message}
    }
    
    return {status: 400, message: "Something went wrong, failed to assign points"}
    

}