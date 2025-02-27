import React, { lazy, Suspense, useEffect } from "react";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes"

// Components
const Not_Found_404 = lazy(() => import("../components/utils/Not_Found_404"))
const Login = lazy(() => import("../components/utils/Login"))
const Register = lazy(() => import("../components/utils/Register"))
const Admin = lazy(() => import("../admin/Admin"))
const User = lazy(() => import("../User/User"))
const Layout = lazy(() => import("../Layout"))

// user COmponents: 
const Profile = lazy(() => import("../User/user_components/Profile"))
const History = lazy(() => import("../User/user_components/History"))
const Tasks = lazy(() => import("../User/user_components/Tasks"))

// state
import {useSelector, useDispatch} from "react-redux"
import { fetchUserProfile } from "../states/userInfo_slice"

// admin components
const Categories = lazy(() => import("../admin/admin_components/Categories"))
const SubCategories = lazy(() => import("../admin/admin_components/SubCategoies"))
const AppsList = lazy(() => import("../admin/admin_components/AdminAppsList"))
const UserByApp = lazy(() => import("../admin/admin_components/UserByApp"))
const MarkdownRenderer = lazy(() => import("../components/ui/Markdown"))



// Random quotes for waiting users
const waitingQuotes = [
    "With Great Js Bundles, comes great waiting timing ✨",
    "Patience is key bro, I dont know about the lock 🔐",
    "Loving flower is ok but loving leaves is great ultra max pro 🍃🍂",
    "You wasted your entire life, so waiting for site load is nothing",
    "appreciate the work of developer",
]
const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * waitingQuotes.length);
    return waitingQuotes[randomIndex];
};


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
        <Suspense fallback={<div>{getRandomQuote()}</div>}>
            <Routes>
                <Route exact path="login/" element={<Login/>} />
                <Route exact path="register/" element={<Register/>} />
                

                {/* User Home Page */}
                <Route  exact path="/" element = {<Layout/>}>
                    <Route exact path="" element = {
                            <ProtectedRoutes allowed_roles={user_page_allowed_roles}>
                                <User/>
                            </ProtectedRoutes>
                    } >
                        <Route exact path="" element={<Tasks/>}/>
                        <Route exact path="profile" element={<Profile/>}/>
                        <Route exact path="history" element={<History/>}/>
                    </Route>


                    {/* Amin Page */}
                    <Route exact path="admin" element = {
                        <ProtectedRoutes allowed_roles={admin_page_allowed_roles}>
                            <Admin/>
                        </ProtectedRoutes>
                    } >
                        {/* ADMIN COMPOMENETS */}
                        <Route exact path="" element={<MarkdownRenderer />}/>
                        <Route exact path="categories" element={<Categories/>}/>
                        <Route exact path="sub-categories" element={<SubCategories/>}/>
                        <Route exact path="apps" element={<AppsList/>} />
                        <Route exact path="user-by-app/:appId" element={<UserByApp/>} />

                    </Route>

                </Route>  
                <Route path="*" element={<Not_Found_404/>} />
            </Routes>
            </Suspense>
        </BrowserRouter>
        </>
    )
}