import Sidebar from "./components/ui/Sidebar"

import "./styles/layout.css"

export default function Layout({sidebar_data, content}){

    return (
        <>
        <main className="main-layout-container w-full min-h-screen *:outline-dashed">
            {/* sidebar */}
            <section className="sidebar-container max-md:fixed">
                <Sidebar sidebar_data={sidebar_data}/>
            </section>

            {/* main content */}
            <section className="content-container ">
                {content}
            </section>
        </main>
        </>
    )
}