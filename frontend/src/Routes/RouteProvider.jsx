import { useEffect } from "react"

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes"

// Components
import Not_Found_404 from "../components/utils/Not_Found_404"
import Login from "../components/utils/Login"
import Register from "../components/utils/Register"
import Admin from "../admin/Admin"
import User from "../User/User"
import Layout from "../Layout"

// user COmponents: 
import Profile from "../User/user_components/Profile"

// local Data 
import { local_profile } from "../states/userInfo_slice"
import { local_token } from "../states/token_slice";
// state
import {useSelector, useDispatch} from "react-redux"
import { fetchUserProfile } from "../states/userInfo_slice";

export default function RouteProvider(){
    const token = useSelector(s=>s.token);
    const profile = useSelector(s=>s.profile)
    const dispatch = useDispatch()

    const isToken_present = token.key || local_token;
    const isUserData_present =  local_profile?.role || profile.data.role ;

    // check if tokenn is present then fetch role
    useEffect(()=>{
        if(isToken_present && !isUserData_present){
            dispatch(fetchUserProfile({token:isToken_present}))
        }
    }, [profile.data.role])

    const admin_page_allowed_roles = ['admin']
    const user_page_allowed_roles = ['admin', 'user']

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="login/" element={<Login/>} />
                <Route path="register/" element={<Register/>} />
                

                <Route path="/" element = {<Layout/>}>
                    {/* User Home Page */}
                    <Route exact path="" element = {
                            <ProtectedRoutes allowed_roles={user_page_allowed_roles}>
                                <User/>
                            </ProtectedRoutes>
                    } >
                        <Route path="profile" element={<Profile/>}/>
                    </Route>

                    {/* Amin Page */}
                    <Route path="admin/" element = {
                        <ProtectedRoutes allowed_roles={admin_page_allowed_roles}>
                            <Admin/>
                        </ProtectedRoutes>
                    } />

                </Route>


                

                
                    
                <Route path="*" element={<Not_Found_404/>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}