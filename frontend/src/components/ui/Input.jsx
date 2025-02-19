import { useState } from "react";

// icons
import {EyeOffIcon, EyeIcon} from "lucide-react"

// ui
import { TypoSmall } from "./Typo";

// label
const Label = ({title, htmlFor}) => {
    return (
        <label className="capitalize mb-2 mt-3" htmlFor={htmlFor}>
            <TypoSmall>
                {title}
            </TypoSmall>
        </label>
    )
}


// input
const Input = ({title, type, icon, state, required}) => {
    
    const [passwordType, setpasswordType] = useState(type)

    // toggle input type 
    const handleEyeClick = () => {
        if(passwordType == "password"){
            setpasswordType("text")
            return
        }
        else{
            setpasswordType("password")
        }
    }

    return (
        <div className="max-w-full flex flex-col gap-1 my-1 items-center *:w-full">
            
            {/* Label */}
            <Label title={`${title}${required?'*':''}`} htmlFor={title} />

            
            <div className="flex items-center gap-3 bg-slate-50 outline rounded px-4 py-2 max-sm:text-sm max-w-full">
                {icon}
                <input 
                    type={passwordType} 
                    value={state.value} 
                    onChange={(e)=>state.set(e.target.value)}
                    placeholder={title}
                    title={title}
                    id={title}
                    className="bg-transparent outline-none w-full"
                    required={required}
                />
                {
                    type=="password" &&
                    <button onClick={()=>handleEyeClick()}>
                        {passwordType=="password" && <EyeOffIcon/>}
                        {passwordType=="text" && <EyeIcon/>}
                    </button>
                }
            </div>
        </div>
    )
}

export default Input;