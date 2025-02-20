// logout will delete token, and all data

// dispatch
import {useDispatch} from "react-redux"

// navigate
import {useNavigate} from "react-router-dom"

// clear actions
import { clearToken } from "../../states/token_slice"
import { clearProfile } from "../../states/userInfo_slice"


export default function Logout(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handleLogout
    const handleLogout = () => {
        
        dispatch(clearToken())
        dispatch(clearProfile())
        navigate("/login")
    }

    return (
        <>
            <button onClick={()=>handleLogout()}>
                logout
            </button>
        </>
    )
}