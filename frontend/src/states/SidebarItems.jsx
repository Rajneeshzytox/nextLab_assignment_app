import {
    HomeIcon,
    User2Icon,
    LucideAppWindow,
    ServerIcon,
    HistoryIcon,
} from "lucide-react"

export const SidebarItems = () => {
    const data = [
            { title: "admin", link: "/admin", icon: <LucideAppWindow/>, allowed_roles: ['admin']},

            { title: "Task", link: "/", icon: <ServerIcon/>, allowed_roles: ['user', 'admin'] },

            { title: "profile", link: "profile", icon: <User2Icon/>, allowed_roles: ['user', 'admin'] },
            
            { title: "history", link: "history", icon: <HistoryIcon/>, allowed_roles: ['user', 'admin'] },
        ]
    return data;
}
