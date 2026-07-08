import {
useState,
useContext
} from "react";

import {
Eye,
EyeOff,
Check,
X
} from "lucide-react";

import {
AuthContext
} from "../context/AuthContext";

import {
useNavigate,
Link
} from "react-router-dom";

import AuthLayout from "../components/AuthLayout";

import TermsModal from "../components/TermsModal";

function Register(){

const{
register
}=useContext(AuthContext);

const navigate=useNavigate();

const[showPassword,setShowPassword]=useState(false);

const[showConfirm,setShowConfirm]=useState(false);

const[showTerms,setShowTerms]=useState(false);

const[accepted,setAccepted]=useState(false);

const[error,setError]=useState("");

const[form,setForm]=useState({

name:"",

username:"",

email:"",

phone:"",

password:"",

confirmPassword:""

});

function update(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}

const rules=[

{

text:"Minimum 8 characters",

valid:form.password.length>=8

},

{

text:"Contains uppercase letter (A-Z)",

valid:/[A-Z]/.test(form.password)

},

{

text:"Contains lowercase letter (a-z)",

valid:/[a-z]/.test(form.password)

},

{

text:"Contains number (0-9)",

valid:/[0-9]/.test(form.password)

},

{

text:"Contains special character (!@#$%^&*)",

valid:/[!@#$%^&*(),.?":{}|<>]/.test(form.password)

},

{

text:"Passwords match",

valid:
form.confirmPassword!=="" &&
form.password===form.confirmPassword

}

];

const passwordValid=rules
.slice(0,5)
.every(rule=>rule.valid);

function submit(e){

e.preventDefault();

setError("");

if(

!form.name.trim() ||

!form.username.trim() ||

!form.email.trim() ||

!form.phone.trim() ||

!form.password ||

!form.confirmPassword

){

setError("Please fill all fields.");

return;

}

if(!accepted){

setError("Accept Terms & Conditions.");

return;

}

if(!passwordValid){

setError("Password does not satisfy all required rules.");

return;

}

if(form.password!==form.confirmPassword){

setError("Passwords do not match.");

return;

}

const result=register(

form.name,

form.username,

form.email,

form.phone,

form.password

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

title="Create Account 🚀"

subtitle="Join your analytics workspace"

>

<form

onSubmit={submit}

className="space-y-5"

>

{

error &&

<div className="bg-red-100 text-red-600 p-3 rounded-xl">

{error}

</div>

}

<input

name="name"

value={form.name}

placeholder="Full Name"

className="auth-input"

onChange={update}

/>

<input

name="username"

value={form.username}

placeholder="Username"

className="auth-input"

onChange={update}

/>

<input

name="email"

type="email"

value={form.email}

placeholder="Email"

className="auth-input"

onChange={update}

/>

<input

name="phone"

value={form.phone}

placeholder="Mobile Number"

className="auth-input"

onChange={update}

/>

<div className="relative">

<input

name="password"

type={showPassword?"text":"password"}

value={form.password}

placeholder="Password"

className="auth-input"

onChange={update}

/>

<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="absolute right-5 top-4"

>

{

showPassword

?

<EyeOff/>

:

<Eye/>

}

</button>

</div>

<div className="space-y-2 text-sm">

{

rules.map((rule,index)=>(

<div
key={index}
className="flex items-center gap-2"
>

{

rule.valid

?

<Check
size={18}
className="text-green-500"
/>

:

<X
size={18}
className="text-red-500"
/>

}

<span
className={
rule.valid
?
"text-green-600 dark:text-green-400"
:
"text-slate-600 dark:text-slate-300"
}
>

{rule.text}

</span>

</div>

))

}

</div>

<div className="relative">

<input

name="confirmPassword"

type={showConfirm?"text":"password"}

value={form.confirmPassword}

placeholder="Confirm Password"

className="auth-input"

onChange={update}

/>

<button

type="button"

onClick={()=>setShowConfirm(!showConfirm)}

className="absolute right-5 top-4"

>

{

showConfirm

?

<EyeOff/>

:

<Eye/>

}

</button>

</div>

<label className="flex items-center gap-3">

<input

type="checkbox"

checked={accepted}

onChange={e=>setAccepted(e.target.checked)}

/>

<button

type="button"

onClick={()=>setShowTerms(true)}

className="text-purple-600 hover:underline"

>

Terms & Conditions

</button>

</label>

<button

type="submit"

disabled={
!passwordValid ||
form.password!==form.confirmPassword ||
!accepted
}

className={`
w-full
py-4
rounded-xl
font-semibold
transition
${
passwordValid &&
form.password===form.confirmPassword &&
accepted
?
"bg-purple-600 hover:bg-purple-700 text-white"
:
"bg-slate-400 cursor-not-allowed text-white"
}
`}

>

Create Account

</button>

<p className="text-center">

Already have an account?

<Link

to="/login"

className="text-purple-600 ml-2 font-semibold"

>

Login

</Link>

</p>

</form>

{

showTerms &&

<TermsModal

close={()=>setShowTerms(false)}

/>

}

</AuthLayout>

);

}

export default Register;