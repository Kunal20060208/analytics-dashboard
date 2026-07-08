import {
useState,
useContext
} from "react";


import {
Eye,
EyeOff
} from "lucide-react";


import {
AuthContext
} from "../context/AuthContext";


import {
useNavigate,
Link
} from "react-router-dom";


import AuthLayout from "../components/AuthLayout";



function Login(){


const {

login

}=useContext(AuthContext);



const navigate=useNavigate();



const [username,setUsername]=useState("");

const [password,setPassword]=useState("");

const [showPassword,setShowPassword]=useState(false);


const [error,setError]=useState("");






function submit(e){

e.preventDefault();



const result = login(

username,

password

);




if(result.success){

navigate("/");

}

else{

setError(result.message);

}


}






return(


<AuthLayout


title="Welcome Back 👋"


subtitle="Login to your analytics dashboard"


>


<form

onSubmit={submit}

className="
space-y-6
"

>


{


error &&

<div className="
bg-red-100
text-red-600
p-3
rounded-xl
">

{error}

</div>


}





<input


placeholder="Username"


value={username}


onChange={
e=>setUsername(e.target.value)
}


className="auth-input"


required


/>







<div className="relative">


<input


type={

showPassword

?

"text"

:

"password"

}



placeholder="Password"



value={password}



onChange={
e=>setPassword(e.target.value)
}



className="auth-input"



required


/>





<button


type="button"



onClick={()=>setShowPassword(!showPassword)}



className="
absolute
right-5
top-4
text-slate-500
dark:text-slate-300
"



>


{


showPassword

?

<EyeOff size={20}/>

:

<Eye size={20}/>


}


</button>




</div>







<button


className="
w-full
bg-purple-600
hover:bg-purple-700
text-white
py-4
rounded-2xl
font-semibold
"


>

Login


</button>








<p className="
text-center
text-slate-600
dark:text-slate-300
">


Don't have account?


<Link

to="/register"

className="
text-purple-600
font-bold
ml-2
"

>

Register

</Link>



</p>




</form>


</AuthLayout>


)


}


export default Login;