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
import History from "../User/user_components/History"

// state
import {useSelector, useDispatch} from "react-redux"
import { fetchUserProfile } from "../states/userInfo_slice";
import Tasks from "../User/user_components/Tasks"
import Categories from "../admin/admin_components/Categories"

export default function RouteProvider(){
    const token = useSelector(s=>s.token);
    const profile = useSelector(s=>s.profile)
    const dispatch = useDispatch()

    const isToken_present = token.key;
    const isUserData_present = profile.data.role ;
    const admin_page_allowed_roles = ['admin']
    const user_page_allowed_roles = ['admin', 'user']


    // check if tokenn is present then fetch role
    useEffect(()=>{
        if(isToken_present && !isUserData_present){
            // alert("token present but not role")
            dispatch(fetchUserProfile({token:isToken_present}))
        }
    }, [isToken_present, isUserData_present])


    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="login/" element={<Login/>} />
                <Route path="register/" element={<Register/>} />
                

                {/* User Home Page */}
                <Route path="/" element = {<Layout/>}>
                    <Route exact path="" element = {
                            <ProtectedRoutes allowed_roles={user_page_allowed_roles}>
                                <User/>
                            </ProtectedRoutes>
                    } >
                        <Route path="" element={<Tasks/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="history" element={<History/>}/>
                    </Route>


                    {/* Amin Page */}
                    <Route exact path="admin/" element = {
                        <ProtectedRoutes allowed_roles={admin_page_allowed_roles}>
                            <Admin/>
                        </ProtectedRoutes>
                    } >

                        <Route path="categories" element={<Categories/>}/>
                    </Route>

                </Route>


                

                
                    
                <Route path="*" element={<Not_Found_404/>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}