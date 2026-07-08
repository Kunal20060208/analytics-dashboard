import {
useContext,
useMemo,
useState
} from "react";

import {
Search,
Mail,
MailOpen,
Trash2,
RefreshCw,
Eye,
Inbox as InboxIcon,
CheckCircle,
XCircle
} from "lucide-react";

import {
AuthContext
} from "../context/AuthContext";

function Inbox(){

const{

user,

getMailHistory,

markMailRead,

clearMailHistory

}=useContext(AuthContext);

const[search,setSearch]=useState("");

const[selectedMail,setSelectedMail]=useState(null);

const[refresh,setRefresh]=useState(false);

const mails=useMemo(()=>{

const all=getMailHistory();

if(!user){

return[];

}

return all.filter(mail=>

mail.to===user.email

||

user.role==="admin"

);

},[refresh,user,getMailHistory]);

const filteredMails=mails.filter(mail=>

mail.subject.toLowerCase().includes(search.toLowerCase())

||

mail.message.toLowerCase().includes(search.toLowerCase())

||

mail.to.toLowerCase().includes(search.toLowerCase())

||

mail.username.toLowerCase().includes(search.toLowerCase())

);

const total=mails.length;

const unread=mails.filter(

m=>!m.read

).length;

const sent=mails.filter(

m=>m.status==="Sent"

).length;

const failed=mails.filter(

m=>m.status==="Failed"

).length;

return(

<div
className="
min-h-screen
bg-slate-100
dark:bg-slate-950
p-8
transition
"
>

<div className="flex justify-between items-center">

<div>

<h1
className="
text-4xl
font-bold
dark:text-white
"
>

📬 Inbox

</h1>

<p
className="
text-slate-500
dark:text-slate-400
mt-2
"
>

View all received mails.

</p>

</div>

<button

onClick={()=>setRefresh(!refresh)}

className="
flex
items-center
gap-2
bg-purple-600
hover:bg-purple-700
text-white
px-5
py-3
rounded-2xl
"

>

<RefreshCw size={18}/>

Refresh

</button>

</div>

<div
className="
grid
grid-cols-2
xl:grid-cols-4
gap-5
mt-8
"
>

<div className="bg-blue-600 text-white rounded-3xl p-5">

<p>Total</p>

<h2 className="text-4xl font-bold mt-3">

{total}

</h2>

</div>

<div className="bg-green-600 text-white rounded-3xl p-5">

<p>Sent</p>

<h2 className="text-4xl font-bold mt-3">

{sent}

</h2>

</div>

<div className="bg-red-600 text-white rounded-3xl p-5">

<p>Failed</p>

<h2 className="text-4xl font-bold mt-3">

{failed}

</h2>

</div>

<div className="bg-orange-500 text-white rounded-3xl p-5">

<p>Unread</p>

<h2 className="text-4xl font-bold mt-3">

{unread}

</h2>

</div>

</div>

<div
className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow-lg
mt-8
p-6
"
>

<div className="flex justify-between items-center flex-wrap gap-4">

<div className="relative">

<Search

size={18}

className="
absolute
left-4
top-3.5
text-slate-500
"

/>

<input

value={search}

onChange={e=>setSearch(e.target.value)}

placeholder="Search mails..."

className="
pl-11
pr-4
py-3
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
outline-none
w-80
"

/>

</div>

<button

onClick={()=>{

if(window.confirm("Delete entire inbox?")){

clearMailHistory();

setRefresh(!refresh);

}

}}

className="
flex
items-center
gap-2
bg-red-600
hover:bg-red-700
text-white
px-5
py-3
rounded-2xl
"

>

<Trash2 size={18}/>

Clear Inbox

</button>

</div>

<div className="overflow-auto mt-8">

<table className="w-full">

<thead>

<tr className="border-b dark:border-slate-700">

<th className="text-left py-4 px-3">

Status

</th>

<th className="text-left py-4 px-3">

Subject

</th>

<th className="text-left py-4 px-3">

Recipient

</th>

<th className="text-left py-4 px-3">

Date

</th>

<th className="text-center py-4 px-3">

Actions

</th>

</tr>

</thead>

<tbody>

{

filteredMails.length===0 ?

<tr>

<td

colSpan={5}

className="text-center py-12 text-slate-500"

>

<InboxIcon

size={50}

className="mx-auto mb-3 opacity-50"

/>

No mails found.

</td>

</tr>

:

filteredMails.map(mail=>(

<tr

key={mail.id}

className="
border-b
dark:border-slate-800
hover:bg-slate-50
dark:hover:bg-slate-800
transition
"

>

<td className="px-3 py-4">

{

mail.read

?

<MailOpen className="text-green-600"/>

:

<Mail className="text-blue-600"/>

}

</td>

<td className="px-3 py-4">

<div>

<h3 className="font-semibold dark:text-white">

{mail.subject}

</h3>

<p className="text-xs text-slate-500">

{mail.status==="Sent"

?

<span className="flex items-center gap-1 text-green-600">

<CheckCircle size={14}/>

Sent

</span>

:

<span className="flex items-center gap-1 text-red-600">

<XCircle size={14}/>

Failed

</span>

}

</p>

</div>

</td>

<td className="px-3 py-4">

{mail.to}

</td>

<td className="px-3 py-4">

{mail.time}

</td>

<td className="px-3 py-4">

<div className="flex justify-center gap-2">

<button

onClick={()=>{

markMailRead(mail.id);

setSelectedMail(mail);

setRefresh(!refresh);

}}

className="
bg-purple-600
hover:bg-purple-700
text-white
p-2
rounded-xl
"

title="View"

>

<Eye size={18}/>

</button>

<button

onClick={()=>{

if(window.confirm("Delete this mail?")){

const mails=JSON.parse(

localStorage.getItem("mails")

)||[];

const updated=mails.filter(

m=>m.id!==mail.id

);

localStorage.setItem(

"mails",

JSON.stringify(updated)

);

setRefresh(!refresh);

}

}}

className="
bg-red-600
hover:bg-red-700
text-white
p-2
rounded-xl
"

title="Delete"

>

<Trash2 size={18}/>

</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

{

selectedMail &&

<div
className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
"
>

<div
className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow-xl
w-[700px]
max-w-[95vw]
p-8
"
>

<div className="flex justify-between items-start">

<div>

<h2
className="
text-2xl
font-bold
dark:text-white
"
>

{selectedMail.subject}

</h2>

<p
className="
text-sm
text-slate-500
mt-2
"
>

To :
<b className="ml-1">

{selectedMail.to}

</b>

</p>

<p
className="
text-sm
text-slate-500
"
>

Username :
<b className="ml-1">

{selectedMail.username}

</b>

</p>

<p
className="
text-sm
text-slate-500
"
>

Time :
<b className="ml-1">

{selectedMail.time}

</b>

</p>

</div>

<button

onClick={()=>setSelectedMail(null)}

className="
bg-red-600
hover:bg-red-700
text-white
px-4
py-2
rounded-xl
"

>

Close

</button>

</div>

<div
className="
mt-8
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
p-6
whitespace-pre-wrap
leading-7
max-h-[400px]
overflow-auto
"
>

{selectedMail.message}

</div>

<div className="mt-6 flex justify-end">

<button

onClick={()=>{

navigator.clipboard.writeText(

selectedMail.message

);

alert("Mail copied.");

}}

className="
bg-purple-600
hover:bg-purple-700
text-white
px-5
py-3
rounded-xl
"

>

Copy Message

</button>

</div>

</div>

</div>

}

</div>

);

}

export default Inbox;