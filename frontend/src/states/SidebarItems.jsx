import {
    HomeIcon,
    User2Icon,
    LucideAppWindow,
} from "lucide-react"

export const SidebarItems = () => {
    const data = [
            { title: "admin", link: "/admin", icon: <LucideAppWindow/>, allowed_roles: ['admin']},

            { title: "home", link: "/", icon: <HomeIcon/>, allowed_roles: ['user', 'admin'] },

            { title: "profile", link: "profile", icon: <User2Icon/>, allowed_roles: ['user', 'admin'] },

        ]
    return data;
}
