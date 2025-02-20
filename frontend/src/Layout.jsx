import Sidebar from "./components/ui/Sidebar"
import { Outlet } from "react-router-dom"

// css
import "./styles/layout.css"

// Sidebbar Items Data
import { SidebarItems } from "./states/SidebarItems"

export default function Layout(){
    const sidebar_data = SidebarItems()
    
    return (
        <>
        <main className="main-layout-container h-full w-full">
            {/* sidebar */}
            <section className="sidebar-container max-md:fixed h-full">
                <Sidebar sidebar_data={sidebar_data}/>
            </section>

            {/* main content */}
            <section className="content-container md:max-h-screen md:overflow-y-scroll">
                <Outlet/>
            </section>
        </main>
        </>
    )
}