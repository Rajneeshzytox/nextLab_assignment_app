import { useEffect } from "react"

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes"

// Components
import Not_Found_404 from "../components/utils/Not_Found_404"
import Login from "../components/utils/Login"
import Register from "../components/utils/Register"
import Admin from "../admin/Admin"
import User from "../User/User"


export default function RouteProvider(){



    const admin_page_allowed_roles = ['admin']
    const user_page_allowed_roles = ['admin', 'user']

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="login/" element={<Login/>} />
                <Route path="register/" element={<Register/>} />
                
                {/* Amin Page */}
                <Route path="admin/" element = {
                    <ProtectedRoutes allowed_roles={admin_page_allowed_roles}>
                        <Admin/>
                    </ProtectedRoutes>
                } />

                {/* User Home Page */}
                <Route path="/" element = {
                    <ProtectedRoutes allowed_roles={user_page_allowed_roles}>
                    <User/>
                </ProtectedRoutes>
                } />
                    
                <Route path="*" element={<Not_Found_404/>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}