import {
useState,
useContext
} from "react";

import {
LifeBuoy,
Send,
CheckCircle
} from "lucide-react";

import {
AuthContext
} from "../context/AuthContext";

function Support(){

const{
user,
sendMail
}=useContext(AuthContext);

const[subject,setSubject]=useState("");

const[message,setMessage]=useState("");

const[sending,setSending]=useState(false);

const[success,setSuccess]=useState(false);

async function submit(e){

e.preventDefault();

if(subject.trim()===""){

alert("Please enter a subject.");

return;

}

if(message.trim()===""){

alert("Please enter your message.");

return;

}

setSending(true);

const supportTarget={

name:"Support Team",

username:"support",

email:"admin123@gmail.com",

phone:"",

role:"support"

};

const result=await sendMail(

supportTarget,

`Support Request: ${subject}`,

`
Support request received.

From:
Name : ${user?.name}
Username : ${user?.username}
Email : ${user?.email}

----------------------------

${message}
`

);

setSending(false);

if(result.success){

setSuccess(true);

setSubject("");

setMessage("");

}
else{

alert(result.message);

}

}

return(

<div className="
min-h-screen
bg-slate-100
dark:bg-slate-950
p-8
">

<div className="
max-w-3xl
mx-auto
bg-white
dark:bg-slate-900
rounded-3xl
shadow-xl
p-8
">

<div className="flex items-center gap-3 mb-8">

<LifeBuoy
className="text-purple-600"
size={34}
/>

<h1 className="
text-4xl
font-bold
dark:text-white
">

Support Center

</h1>

</div>

<p className="
text-slate-500
dark:text-slate-400
mb-8
">

Need help?
Report bugs, request features or contact the administrator.

</p>

{

success &&

<div className="
mb-6
rounded-2xl
bg-green-100
text-green-700
p-4
flex
items-center
gap-3
">

<CheckCircle/>

Support request sent successfully.

</div>

}

<form
onSubmit={submit}
className="space-y-6"
>

<div>

<label className="font-semibold dark:text-white">

Subject

</label>

<input

value={subject}

onChange={e=>setSubject(e.target.value)}

className="
mt-2
w-full
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
p-4
outline-none
"

placeholder="Enter subject"

/>

</div>

<div>

<label className="font-semibold dark:text-white">

Message

</label>

<textarea

rows="8"

value={message}

onChange={e=>setMessage(e.target.value)}

className="
mt-2
w-full
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
p-4
outline-none
resize-none
"

placeholder="Describe your issue..."

></textarea>

</div>

<button

type="submit"

disabled={sending}

className="
flex
items-center
gap-2
bg-purple-600
hover:bg-purple-700
disabled:opacity-50
text-white
px-8
py-4
rounded-2xl
"

>

<Send size={18}/>

{

sending

?

"Sending..."

:

"Send Request"

}

</button>

</form>

<div className="
mt-10
border-t
dark:border-slate-700
pt-8
space-y-3
text-slate-600
dark:text-slate-300
">

<h2 className="text-xl font-bold">

Quick Help

</h2>

<ul className="list-disc ml-6 space-y-2">

<li>Reset your password from your profile page.</li>

<li>Contact the administrator for account recovery.</li>

<li>Report bugs with detailed steps.</li>

<li>Request new dashboard features.</li>

<li>Check Inbox for system notifications.</li>

</ul>

</div>

</div>

</div>

);

}

export default Support;