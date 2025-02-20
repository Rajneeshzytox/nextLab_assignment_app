import { Outlet } from "react-router-dom"

export default function User(){
    return (
        <>
            <main className="User_container size-full max-md:pt-20 pt-10 px-8 min-h-screen z-10">
                <Outlet />
            </main>
        </>
    )
}
