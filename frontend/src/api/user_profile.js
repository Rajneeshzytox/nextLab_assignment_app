import { API_Routes, API_Headers } from "./api_base";


const headers = API_Headers


export const fetchProfile = async (token) => {
    // adding token to header
    if(!token){
        return {status: 400, message: "Token not present"}
    }
    headers["Authorization"] = `token ${token}`;
    // console.log(headers)

    // try to get data
    try {
        const res = await fetch(API_Routes.profile, {headers: headers})
        const res_data = await res.json();

        // if successfull 
        if(res_data.status == "ok"){
            return {status: 200, data: res_data.data, message: "fetching profile done"};
        }
        // otherwise invalid token
        return {status: 400, message: "token invalid"}

    } catch (error) {
        consolel.log(error)
        return {status: 400, message: str(error)}
    } 
}


/* 
GET res: 
{
  "status": "ok",
  "data": {
    "username": "temp",
    "first_name": "",
    "last_name": "",
    "email": "",
    "role": "user",
    "points": 125
  }
}


*/