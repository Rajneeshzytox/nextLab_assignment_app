import {useSelector} from "react-redux"
import { Outlet } from "react-router-dom"

export default function Admin(){
    const profile = useSelector(s=>s.profile)

     return (
        <>
            <main className="Admin_container size-full max-md:pt-20 pt-10 px-8 min-h-screen ">
            <div className="px-4 py-2 bg-green-300 rounded-md"> as deadline is near, I am not adding styles in admin </div>

                <Outlet/>
                

            </main>
        </>
    )
}