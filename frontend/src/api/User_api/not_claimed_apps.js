
import { data } from "react-router-dom"
import {API_Routes, API_Headers} from "../api_base"


export const get_apps_not_claimed = async () => {
    try {
        const res = await fetch(API_Routes.notClaimed,{
            headers:API_Headers
        })

        const res_data = await res.json()

        if(res_data.status == "ok"){
            return {status:200, data: res_data.data}
        }

        return {status:400, message: "token is invalid or something went wrong !"}
        
    } catch (error) {
        console.log("error at get_apps_not_claimed ", error)
    }
}


/**
 * 
 * 
 {
  "status": "ok",
  "data": [
    {
      "id": 1,
      "title": "app-2",
      "points": 0,
      "img": null,
      "url": "http://google.com",
      "categories": [
        {
          "id": 1,
          "title": "abcd",
          "date_created": "2025-02-14"
        }
      ],
      "sub_categories": [
        {
          "id": 1,
          "title": "sub-cat-1",
          "category": {
            "id": 1,
            "title": "abcd",
            "date_created": "2025-02-14"
          },
          "date_created": "2025-02-14"
        }
      ],
      "is_active": true,
      "date_created": "2025-02-14"
    },
    
  ]
}
 */