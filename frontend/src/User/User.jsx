// states
import {useSelector} from "react-redux"

// layout ui
import { TypoP } from "../components/ui/Typo";
import Layout from "../Layout"
import Not_Found_404 from "../components/utils/Not_Found_404"

// icons 
import {HomeIcon} from "lucide-react"


function UserContent({user}){

    return (
        <>
            <main className="User_container size-full grid place-content-center min-h-screen">
                {user.username} | {user.role}
            </main>
        </>
    )
}


export default function User(){
    const user = useSelector(s=>s.profile.data)

    const sideBar_items = [
        { title: "admin", link: "/admin", icon: <HomeIcon/> }
    ];
    return (
        <>
        <Layout sidebar_data={sideBar_items} content={<UserContent user={user}/>} />    
        </>
    )
}