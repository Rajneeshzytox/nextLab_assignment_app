// server url to backend
export const Server_URL = 'http://127.0.0.1:8000'

// api base url
export const API_BASE = `${Server_URL}/api`

// api routes 
export const API_Routes = {
    login : API_BASE + '/login/',
    register : API_BASE + '/register/',
    logout : API_BASE + '/logout/',
    
    admin : API_BASE + '/admin/',
    categories : API_BASE + '/categories/',
    subCategories : API_BASE + '/sub-categories/',
    apps : API_BASE + '/apps/',


    profile : API_BASE + '/profile/',
    history : API_BASE + '/history/',
    getApps : API_BASE + '/get-apps/',
    notClaimed : API_BASE + '/get-apps/?not-claimed=true/',
    
    download : API_BASE + '/download/',

}


// Headers 
export const API_Headers = {
    "Content-Type": "application/json",
}

