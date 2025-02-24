import {API_Routes, API_Headers} from "../api_base"

export const downloadApp = async (appId, imgUrl) => {

    // if screenshot not present
    if(!imgUrl || !appId){
        return {success: false, message:"add screenshot first"}
    }
    
    // body data 
    const data = {
        user_screenshot: imgUrl
    }

    try {
        const res = await fetch(`${API_Routes.download}${appId}/`, {
            method: 'POST',
            headers: API_Headers,
            body: JSON.stringify(data)
        })

        if(res.ok){
            const res_data = await res.json()
            
            // success
            if (res_data.status == "ok") {
                return {success: true, message: res_data.message}
            }

            // user mistake
            return {success: false, message: res_data.message}
        }

        // if res is not 200, 
        return {success: false, message:"somethign went wrong"}
    } 
    
    catch (error) {
        console.error(error)
        return {success: false, message:"somethign went wrong"}

    }

    
} 
