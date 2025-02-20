import { TypoH4 } from "./Typo"
import {NavLink} from "react-router-dom"
export default function Item({data, active}){

    return (
        <>
            {/* items */}
            <NavLink to={data.link} className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${active ? "w-full" : "w-fit"} ${isActive ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-800'}`
            }>
                    <div className="*:w-5">
                        {data.icon}
                    </div>

                    <TypoH4 className={`${active? "": "hidden"}`}>
                        {data.title}
                    </TypoH4>
            </NavLink>
        </>
    )
}