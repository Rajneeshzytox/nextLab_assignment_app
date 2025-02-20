import { TypoH4 } from "./Typo"
import {Link} from "react-router-dom"
export default function Item({data, active}){

    return (
        <>
            {/* items */}
            <Link to={data.link} className={`flex items-center gap-3 px-3 py-2 bg-slate-100 rounded-md cursor-pointer ${active?"w-full": "w-fit"}`}>
                    <div className="*:w-5">
                        {data.icon}
                    </div>

                    <TypoH4 className={`${active? "": "hidden"}`}>
                        {data.title}
                    </TypoH4>
            </Link>
        </>
    )
}