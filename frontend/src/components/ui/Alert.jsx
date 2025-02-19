import { useEffect } from "react";

// icons
import {CircleXIcon} from "lucide-react"

// ui
import { TypoP } from "./Typo";

const Alert = ({alertState}) => {
    const theme = alertState.state.theme == "danger"? "bg-red-300" : "bg-slate-300"

    const handleCloseAlert = ()=> {
        alertState.set({
            message: "",
            status: false,
            theme: ''
        })
    }

    setTimeout(()=>{
        handleCloseAlert()
    }, 4000)
    

    return (
        <>
        <div className={`flex justify-between items-center px-4 py-2 m-6 ${theme} fixed w-72 rounded-md bottom-0 right-0`}>
            <TypoP>
                {alertState.state.message}
            </TypoP>
            <button onClick={()=>handleCloseAlert()}>
                <CircleXIcon/>
            </button>
        </div>
        </>
    )
}

export default Alert;