// logout will delete token, and all data

// dispatch
import {useDispatch} from "react-redux"

// navigate
import {useNavigate} from "react-router-dom"

// clear actions
import { clearToken } from "../../states/token_slice"
import { clearProfile } from "../../states/userInfo_slice"

// icon 
import {LogOutIcon} from "lucide-react"


export default function Logout({show_title}){
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
            <button onClick={()=>handleLogout()} className="bg-slate-100 w-full flex justify-center items-center gap-4 text-red-700 px-4 py-2 rounded-md font-semibold">
                <LogOutIcon className="w-5" />
                {show_title && <p>Logout</p>}
            </button>
        </>
    )
}