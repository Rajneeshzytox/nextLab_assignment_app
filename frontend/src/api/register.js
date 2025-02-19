import { API_Routes, API_Headers } from "./api_base";

const register = async (register_data) => {
    try {
        const res = await fetch(API_Routes.register, {
            method: "POST", 
            headers: API_Headers,
            body: JSON.stringify(register_data)
        })

        // response.data
        const data = await res.json()

        // if register successfull
        if(data.status == "ok"){
            return {status: 200, key: data.token, message:"🎉 Welcome to our family !", userData: data.data}
        }
        
        // if data is missing
        else {
            return {status: 400, message:"Enter Required Fields"}
        }

        
    } catch (error) {
        console.log(error)
    }

}

export default register;



/*

request : 
{
    "username": "temp4", // required
    "password": "1234abc@@", // required
    "first_name": "temp 4",
    "last_name": "last_name",
    "email": "email@email.com"
}

ok res: 
{
  "status": "ok",
  "message": "created user successfully",
  "token": "cceb7d1g3fha6fe85a86803cf164d3f0d6ec23de",
  "data": {
    "username": "temp",
    "first_name": "temp_first",
    "last_name": "temp_last",
    "email": "temp@temp.com"
  }
}

err: res: 
{
  "status": "not",
  "errors": {
    "username": [
      "This field is required."
    ],
    "password": [
      "This field is required."
    ]
  }
}

*/