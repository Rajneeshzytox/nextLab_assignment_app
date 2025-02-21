import {API_Routes, API_Headers} from "../api_base"

export const history = async () => {
    try {
        const res = await fetch(API_Routes.history,{
            headers:API_Headers
        })

        const res_data = await res.json()

        if(res_data.status == "ok"){
            return {status:200, data: res_data.data}
        }

        return {status:400, message: "token is invalid or something went wrong !"}
    } catch (error) {
        console.error("failed to load history, ", error)
    }
    
}


// {
//     "status": "ok",
//     "data": [
//       {
//         "id": 3,
//         "appID": 2,
//         "appImg": "appImg/pic_raj.jpg",
//         "appName": "app-1",
//         "user_id": "temp",
//         "date": "2025-02-18T13:29:27.875660Z",
//         "points_earned": 5
//       }
//     ]
//   }