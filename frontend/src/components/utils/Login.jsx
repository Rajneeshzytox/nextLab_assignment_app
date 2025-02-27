import { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";

// token
import { useDispatch, useSelector } from "react-redux";
import { fetchTokenID } from "../../states/token_slice";
import { fetchUserProfile } from "../../states/userInfo_slice";

// ui
import Input from "../ui/Input";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import { TypoH1, TypoSmall } from "../ui/Typo";
import GlowBox from "../ui/glowBox";

// icons
import { UserCircle, Lock } from "lucide-react";

//  -----------------
// LOGIN
//  -----------------
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // form Data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // alert
  const [showAlert, setShowAlert] = useState({
    status: false,
    message: "",
    theme: "",
  });

  // states
  const token = useSelector((s) => s.token);
  const profile = useSelector((s)=>s.profile.data)


  // submit
  const handleSubmit = (username, password) => {
    if (!username || !password) {
      setShowAlert({
        status: true,
        message: "Please Enter Both Username & Password",
        theme: "danger",
      });
      return;
    }
    const login_form_data = {
      username: username,
      password: password,
    };

    dispatch(
      fetchTokenID({
        data: login_form_data,
        isRegister: false,
      })
    );
  };

  // Upadte Message
  useEffect(() => {
    if (token.message) {
      setShowAlert({
        theme: token.isError ? "danger" : "slate",
        message: token.message,
        status: true,
      });
    } else {
      setShowAlert({
        status: false,
        message: "",
        theme: "",
      });
    }

    // if login is successfull but data is not loaded
    if(token.key && !profile.role){
        // get user info
        dispatch(fetchUserProfile({token: token.key}))
    }

    // if get role move to home
    if(profile.role){
        setTimeout(() => {
            navigate("/")
        }, 500);
    }
  }, [token.message, token.isError, token.key, profile.role]);

  return (
    <main className="flex min-h-screen">
      <GlowBox/>
      
      <section className="Login_container size-full flex flex-col justify-center min-h-screen relative px-4 mx-auto max-w-96">
        <TypoH1>Login</TypoH1>

          <Input
            type="text"
            title="username"
            icon={<UserCircle />}
            state={{ value: username, set: setUsername }}
            required={true}
          />
          <Input
            type="password"
            title="password"
            icon={<Lock />}
            state={{ value: password, set: setPassword }}
            required={true}
          />
          <button onClick={() => handleSubmit(username, password)}>
            <Button>Login</Button>
          </button>
       

        {/* alert */}
        {showAlert.status && (
          <Alert
            alertState={{
              state: showAlert,
              set: setShowAlert,
            }}
          />
        )}

        {/* Move to Register */}
        <Link to="/register"><TypoSmall className="hover:underline">create a new account</TypoSmall></Link>
      </section>
    </main>
  );
}
