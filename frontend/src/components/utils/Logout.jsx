// logout will delete token, and all data

// dispatch
import {useDispatch, useSelector} from "react-redux"

// clear actions
import { clearToken } from "../../states/token_slice"
import { clearProfile } from "../../states/userInfo_slice"
 

// icon 
import {LogOutIcon} from "lucide-react"
import { logout } from "../../api/logout"

export default function Logout({show_title}){
    const dispatch = useDispatch();
    const token_key = useSelector(s=>s.token.key)

    const clear_data = () => {
        dispatch(clearToken())
        dispatch(clearProfile())
    }
    // handleLogout
    const handleLogout = async () => {
        await logout(token_key);
        setTimeout(()=>{
            clear_data()
        }, 2000)
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