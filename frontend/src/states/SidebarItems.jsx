import {
    HomeIcon,
    User2Icon,
    LucideAppWindow,
    TableOfContentsIcon
} from "lucide-react"

export const SidebarItems = () => {
    const data = [
            { title: "admin", link: "/admin", icon: <LucideAppWindow/>, allowed_roles: ['admin']},

            { title: "Task", link: "/", icon: <TableOfContentsIcon/>, allowed_roles: ['user', 'admin'] },

            { title: "profile", link: "profile", icon: <User2Icon/>, allowed_roles: ['user', 'admin'] },

        ]
    return data;
}
