import { API_Routes, API_Headers } from "./api_base";


const login = async (login_data) => {
    try {
        const res = await fetch(API_Routes.login, {
            method: "POST", 
            headers: API_Headers,
            body: JSON.stringify(login_data)
        })

        const data = await res.json()

        // if token exist
        if(data.token){
            return {status: 200, key: data.token, message: "login successfull redirecting to home, because you haven't one "}
        }
        
        // if data is wrong
        else if (data.non_field_errors) {
            
            return {status: 400, message:"Is it a guessing game?, Dont try to add random password or username, Our System is Powerful 🕵️‍♀️"}
        }
        
        // if data is missing
        else {
            return {status: 400, message: "Enter Enter Data Properly, You are not a kid 👶. or maybe you are?"}
        }

        
    } catch (error) {
        console.log(error)
    }

}

export default login;


/*
Sample request : 
{
  "username": "temp2",
  "password": "12347abc@@"
}

sample response 200: 
{
  "token": "f4f655dc0gf0g93dj9ea8cdd455b0b8436e57331"
}

// mission fields 400 BAD req
{
  "username": [
    "This field is required."
  ],
  "password": [
    "This field is required."
  ]
}

failed: res 400 Bad : 
{
  "non_field_errors": [
    "Unable to log in with provided credentials."
  ]
}
*/