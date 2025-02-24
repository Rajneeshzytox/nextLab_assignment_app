import {
    AirplayIcon,
    User2Icon,
    LucideAppWindow,
    ServerIcon,
    HistoryIcon,
    ChartNoAxesGanttIcon,
} from "lucide-react"

export const SidebarItems = () => {
    const data = [

        // ADMIN 
            { title: "admin", link: "/admin", icon: <LucideAppWindow/>, allowed_roles: ['admin']},
            { title: "Apps", link: "/admin/apps", icon: <AirplayIcon/>, allowed_roles: ['admin'] },
            { title: "categories", link: "/admin/categories", icon: <ChartNoAxesGanttIcon/>, allowed_roles: ['admin'] },
            { title: "Sub Categories", link: "/admin/sub-categories", icon: <ChartNoAxesGanttIcon/>, allowed_roles: ['admin'] },
            
        // User
            { title: "Task", link: "/", icon: <ServerIcon/>, allowed_roles: ['user', 'admin'] },
            { title: "history", link: "history", icon: <HistoryIcon/>, allowed_roles: ['user', 'admin'] },
            { title: "profile", link: "profile", icon: <User2Icon/>, allowed_roles: ['user', 'admin'] },
        ]
    return data;
}
