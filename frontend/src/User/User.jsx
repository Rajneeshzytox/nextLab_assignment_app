import { Outlet } from "react-router-dom"

export default function User(){
    return (
        <>
            <main className="User_container size-full grid place-content-center min-h-screen">
                <Outlet />
            </main>
        </>
    )
}
