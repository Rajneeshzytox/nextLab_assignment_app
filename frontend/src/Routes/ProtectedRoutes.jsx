import {Navigate} from "react-router-dom"
import Not_Found_404 from "../components/utils/Not_Found_404"

// states
import {useSelector} from "react-redux"

// if user role is in allowed roles then return chilrn
export default function ProtectedRoutes({children, allowed_roles}){
    const user_role = useSelector((s)=>s.profile.data.role)
    const user_isLogin = useSelector((s)=>s.token.isLogin)

    if(!user_isLogin){
        return <Navigate to='/login'/>
    }

    // if use is login and role is allowed
    if(user_isLogin && allowed_roles.includes(user_role)){
        return children
    }

    // if user has not allowed role
    return <Not_Found_404 title={"Looks Like You Dont Have Permission to access this Pagee"} />
    
}