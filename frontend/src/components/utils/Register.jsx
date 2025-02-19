import { useEffect, useState } from "react"
import {Navigate, useNavigate} from "react-router-dom"

// token 
import {useDispatch, useSelector} from "react-redux"
import { fetchTokenID } from "../../states/token_slice" 

// ui
import Input from "../ui/Input"
import Alert from "../ui/Alert"
import Button from "../ui/Button"
import { TypoH1 } from "../ui/Typo"


// icons
import {
    UserCircle, 
    Lock,
    AtSignIcon,
    UserRoundPenIcon,
} from "lucide-react"


//  -----------------
// Register
//  -----------------
export default function Register(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // form Data
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [Email, setEmail] = useState('')
    
    // alert
    const [showAlert, setShowAlert] = useState({
        status: false, 
        message: '',
        theme: ''
    })

    const token = useSelector((s)=>s.token)

    // if already login - redirect to user page
    if(token.key || localStorage.getItem('TOKEN_NEXTLAB_ASSIGNMENT')){
        navigate("/")
    }
    
    // submit
    const handleSubmit = (e) => {
        e.preventDefault()

        if(!username || !password){
            setShowAlert({
                status: true,
                message: "Please Enter Both Username & Password",
                theme: 'danger'
            })
            return 
        }
        const register_form_data = {
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
            email: Email,
        }

        dispatch(fetchTokenID({
            data: register_form_data,
            isRegister: true
        }))
    }

    // Upadte Message 
    useEffect(() => {
        if (token.message) {
            setShowAlert({
                theme: token.isError ? 'danger' : 'slate',
                message: token.message,
                status: true,
            })
        }
        
        else {
            setShowAlert({
                status: false, 
                message: '', 
                theme: ''
            })
        }

        if(token.key){
            setTimeout(() => {
                navigate("/")
            }, 2000);
        }
    }, [token.message, token.isError, token.key, Navigate])

    return (
        <main className="flex min-h-screen">
            <div className="bg-slate-700 hidden md:block w-1/2">
            </div>
            <section className="Login_container size-full flex flex-col justify-center min-h-screen relative px-4 mx-auto max-w-[500px]">
                <TypoH1 >
                    Register
                </TypoH1>
                
                <div className="flex flex-col sm:gap-4 sm:flex-row"> 
                    <Input
                        type="text"
                        title="First-Name"
                        icon={<UserRoundPenIcon/>}
                        state={{value: firstName, set: setfirstName}}
                        required={false}
                    />
                    <Input
                        type="text"
                        title="Last-Name"
                        icon={<UserRoundPenIcon/>}
                        state={{value: lastName, set: setlastName}}
                        required={false}
                    />
                </div>

                <Input
                    type="text"
                    title="username"
                    icon={<UserCircle/>}
                    state={{value: username, set: setUsername}}
                    required={true}
                />
                <Input
                    type="email"
                    title="email"
                    icon={<AtSignIcon/>}
                    state={{value: Email, set: setEmail}}
                    required={false}
                />
                <Input
                    type="password"
                    title="password"
                    icon={<Lock/>}
                    state={{value: password, set: setPassword}}
                    required={true}
                />
                <button type="submit" onClick={(e)=>handleSubmit(e)}>
                    <Button>
                        Register
                    </Button>
                </button>

                {/* alert */}
                {
                    showAlert.status &&
                    <Alert 
                        alertState={{
                            state: showAlert,
                            set: setShowAlert
                        }}
                        
                    />
                }
            </section>
        </main>
    )
}