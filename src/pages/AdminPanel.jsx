import {
useContext,
useMemo,
useState
} from "react";

import {
Navigate
} from "react-router-dom";

import {
Users,
Mail,
ShieldCheck,
Ban,
UserCheck,
Search,
RefreshCw,
Database,
Activity,
UserCog,
Trash2,
Pencil,
Send
} from "lucide-react";

import {
AuthContext
} from "../context/AuthContext";

function StatCard({
title,
value,
icon,
color
}){

return(

<div
className={`
rounded-3xl
shadow-lg
p-6
text-white
transition
hover:scale-[1.02]
${color}
`}
>

<div className="flex justify-between items-center">

<div>

<p className="text-sm opacity-80">

{title}

</p>

<h2 className="text-4xl font-bold mt-3">

{value}

</h2>

</div>

<div>

{icon}

</div>

</div>

</div>

);

}

function AdminPanel(){

const{

user,

getAllUsers,

getStatistics,

getMailHistory,

adminUpdateUser,

deleteUser,

editUser,

sendMailToUser,

broadcastMail

}=useContext(AuthContext);

if(!user || user.role!=="admin"){

return <Navigate to="/"/>;

}

const [refresh,setRefresh]=useState(0);

const statistics=useMemo(
()=>getStatistics(),
[refresh]
);

const allUsers=useMemo(
()=>getAllUsers(),
[refresh]
);

const mailHistory=useMemo(
()=>getMailHistory(),
[refresh]
);

const[search,setSearch]=useState("");

const[selectedUser,setSelectedUser]=useState(null);

const[showEdit,setShowEdit]=useState(false);

const[showMail,setShowMail]=useState(false);

const[broadcast,setBroadcast]=useState(false);

const filteredUsers=allUsers.filter(u=>

u.name.toLowerCase().includes(search.toLowerCase())

||

u.username.toLowerCase().includes(search.toLowerCase())

||

u.email.toLowerCase().includes(search.toLowerCase())

||

u.phone.includes(search)

);

return(

<div
className="
min-h-screen
bg-slate-100
dark:bg-slate-950
transition
p-8
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

🛡 Admin Control Center

</h1>

<p
className="
text-slate-500
dark:text-slate-400
mt-2
"
>

Manage users, mails, analytics and security.

</p>

</div>

<button
onClick={()=>setRefresh(v=>v+1)}
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
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
mt-10
"
>

<StatCard

title="Registered Users"

value={statistics.totalUsers}

icon={<Users size={42}/>}

color="bg-blue-600"

/>

<StatCard

title="Active Users"

value={statistics.activeUsers}

icon={<UserCheck size={42}/>}

color="bg-green-600"

/>

<StatCard

title="Banned Users"

value={statistics.bannedUsers}

icon={<Ban size={42}/>}

color="bg-red-600"

/>

<StatCard

title="Emails Sent"

value={statistics.totalMails}

icon={<Mail size={42}/>}

color="bg-purple-600"

/>

<StatCard

title="Database"

value="Local"

icon={<Database size={42}/>}

color="bg-orange-500"

/>

<StatCard

title="System Health"

value="100%"

icon={<ShieldCheck size={42}/>}

color="bg-emerald-600"

/>

<StatCard

title="Administrators"

value={

allUsers.filter(u=>u.role==="admin").length

}

icon={<UserCog size={42}/>}

color="bg-indigo-600"

/>

<StatCard

title="Mail Queue"

value={mailHistory.length}

icon={<Send size={42}/>}

color="bg-pink-600"

/>

</div>

<div
className="
mt-10
bg-white
dark:bg-slate-900
rounded-3xl
shadow-lg
p-6
"
>

<div className="flex justify-between items-center">

<h2
className="
text-2xl
font-bold
dark:text-white
"
>

Registered Users

</h2>

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

placeholder="Search users..."

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

</div>

<div className="overflow-x-auto mt-8">

<table className="w-full">

<thead>

<tr className="border-b dark:border-slate-700">

<th className="text-left py-4 px-3">Name</th>

<th className="text-left py-4 px-3">Username</th>

<th className="text-left py-4 px-3">Email</th>

<th className="text-left py-4 px-3">Phone</th>

<th className="text-left py-4 px-3">Role</th>

<th className="text-left py-4 px-3">Status</th>

<th className="text-center py-4 px-3">Actions</th>

</tr>

</thead>

<tbody>

{

filteredUsers.length===0 ?

<tr>

<td
colSpan={7}
className="text-center py-12 text-slate-500"
>

No users found.

</td>

</tr>

:

filteredUsers.map(u=>(

<tr
key={u.id}
className="
border-b
dark:border-slate-800
hover:bg-slate-50
dark:hover:bg-slate-800
transition
"
>

<td className="px-3 py-4">

<div>

<h3 className="font-semibold dark:text-white">

{u.name}

</h3>

<p className="text-xs text-slate-500">

{u.createdAt}

</p>

</div>

</td>

<td className="px-3 py-4">

@{u.username}

</td>

<td className="px-3 py-4">

{u.email}

</td>

<td className="px-3 py-4">

{u.phone}

</td>

<td className="px-3 py-4">

<span
className={`
px-3
py-1
rounded-full
text-xs
font-semibold
${u.role==="admin"
?
"bg-purple-600 text-white"
:
"bg-slate-200 dark:bg-slate-700"}
`}
>

{u.role ? u.role : "user"}

</span>

</td>

<td className="px-3 py-4">

{

u.banned ?

<span className="text-red-500 font-semibold">

Banned

</span>

:

<span className="text-green-600 font-semibold">

Active

</span>

}

</td>

<td className="px-3 py-4">

<div className="flex justify-center gap-2 flex-wrap">

<button

onClick={()=>{

setSelectedUser(u);

setShowEdit(true);

}}

className="
bg-blue-600
hover:bg-blue-700
text-white
p-2
rounded-xl
"

title="Edit User"

>

<Pencil size={16}/>

</button>

<button

onClick={()=>{

adminUpdateUser(

u.id,

!u.banned

);

setRefresh(v=>v+1);

}}

className={`
p-2
rounded-xl
text-white
${u.banned
?
"bg-green-600 hover:bg-green-700"
:
"bg-red-600 hover:bg-red-700"}
`}

title={
u.banned
?
"Unban"
:
"Ban"
}

>

{

u.banned ?

<UserCheck size={16}/>

:

<Ban size={16}/>

}

</button>

<button

onClick={()=>{

setSelectedUser(u);

setShowMail(true);

}}

className="
bg-purple-600
hover:bg-purple-700
text-white
p-2
rounded-xl
"

title="Send Mail"

>

<Send size={16}/>

</button>

<button

onClick={()=>{

if(

window.confirm(

`Delete ${u.name}?`

)

){

deleteUser(u.id);

setRefresh(v=>v+1);

}

}}

className="
bg-slate-800
hover:bg-black
text-white
p-2
rounded-xl
"

title="Delete User"

>

<Trash2 size={16}/>

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

{/* =========================
EDIT USER MODAL
========================= */}

{
showEdit && selectedUser &&

<div className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
">

<div className="
bg-white
dark:bg-slate-900
rounded-3xl
p-8
w-[520px]
space-y-5
">

<h2 className="
text-2xl
font-bold
dark:text-white
">

Edit User

</h2>

<input

defaultValue={selectedUser.name}

id="editName"

placeholder="Name"

className="
auth-input
"

/>

<input

defaultValue={selectedUser.email}

id="editEmail"

placeholder="Email"

className="
auth-input
"

/>

<input

defaultValue={selectedUser.phone}

id="editPhone"

placeholder="Phone"

className="
auth-input
"

/>

<select

defaultValue={selectedUser.role}

id="editRole"

className="
auth-input
"

>

<option value="user">

User

</option>

<option value="admin">

Admin

</option>

</select>

<div className="flex gap-4 justify-end">

<button

onClick={()=>setShowEdit(false)}

className="
px-5
py-3
rounded-xl
bg-slate-300
"

>

Cancel

</button>

<button

onClick={()=>{

const result=editUser(

selectedUser.id,

{

name:document.getElementById("editName").value.trim(),

email:document.getElementById("editEmail").value.trim(),

phone:document.getElementById("editPhone").value.trim(),

role:document.getElementById("editRole").value

}

);

if(result.success){

alert(result.message);

setShowEdit(false);

setSelectedUser(null);

setRefresh(v=>v+1);

}

else{

alert(result.message);

}

}}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-3
rounded-xl
"

>

Save

</button>

</div>

</div>

</div>

}



{/* =========================
SEND MAIL MODAL
========================= */}

{
showMail && selectedUser &&

<div className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
">

<div className="
bg-white
dark:bg-slate-900
rounded-3xl
p-8
w-[650px]
">

<div className="mt-4">

{

broadcast ?

<div className="bg-red-100 text-red-700 p-3 rounded-xl">

⚠ Broadcast Mode

Every registered user will receive this email.

</div>

:

<div className="bg-blue-100 text-blue-700 p-3 rounded-xl">

📧 Single User Mode

Only {selectedUser.name} will receive this email.

</div>

}

</div>

<h2 className="
text-2xl
font-bold
dark:text-white
mb-4
">

Send Mail

</h2>

<p className="text-sm text-slate-500 mb-3">

Available placeholders:

<b>{"{name}"}</b> ,

<b>{"{username}"}</b> ,

<b>{"{email}"}</b> ,

<b>{"{phone}"}</b> ,

<b>{"{role}"}</b>

</p>

<input

id="mailSubject"

placeholder="Subject"

className="
w-full
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
p-4
outline-none
mb-4
"
/>

<textarea

id="mailMessage"

rows="8"

className="
w-full
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
p-4
outline-none
"

placeholder="Write your email..."

></textarea>

<div className="
flex
justify-between
mt-6
">

<button

onClick={()=>{

setBroadcast(!broadcast);

}}

className="
bg-purple-600
text-white
px-5
py-3
rounded-xl
"

>

{

broadcast

?

"Broadcast Enabled"

:

"Single User"

}

</button>

<div className="flex gap-3">

<button

onClick={()=>setShowMail(false)}

className="
bg-slate-300
px-5
py-3
rounded-xl
"

>

Cancel

</button>

<button

onClick={()=>{

const subject=document.getElementById("mailSubject").value.trim();

const message=document.getElementById("mailMessage").value.trim();

if(!subject){

alert("Please enter subject.");

return;

}

if(!message){

alert("Please enter message.");

return;

}

(async()=>{

let result;

if(broadcast){

result=await broadcastMail(subject,message);

}

else{

result=await sendMailToUser(
selectedUser.id,
subject,
message
);

}

alert(result.message);

if(result.success){

setShowMail(false);

}

})();

setRefresh(v=>v+1);

}}

className="
bg-green-600
hover:bg-green-700
text-white
px-6
py-3
rounded-xl
"

>

Send Mail

</button>

</div>

</div>

</div>

</div>

}



{/* =========================
RECENT MAIL HISTORY
========================= */}

<div className="
grid
xl:grid-cols-2
gap-8
mt-10
">

<div className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow-lg
p-6
">

<h2 className="
text-2xl
font-bold
mb-6
dark:text-white
">

Recent Mail History

</h2>

<div className="
space-y-5
max-h-[420px]
overflow-auto
">

{

mailHistory.slice().reverse().map(mail=>(

<div

key={mail.id}

className="
border-b
pb-4
dark:border-slate-700
"

>

<h3 className="font-semibold dark:text-white">

To : {mail.to}

</h3>

<p className="text-xs text-purple-600 mt-1">

Subject : {mail.subject}

</p>

<p className="text-slate-500 text-sm mt-2">

{mail.message}

</p>

<p className="text-xs text-slate-400 mt-2">

{mail.time}

</p>

</div>

))

}

</div>

</div>



<div className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow-lg
p-6
">

<h2 className="
text-2xl
font-bold
mb-6
dark:text-white
">

System Activity

</h2>

<div className="space-y-5">

<div className="flex items-center gap-4">

<Activity className="text-green-500"/>

<div>

<p className="font-semibold dark:text-white">

Users Online

</p>

<p className="text-slate-500">

{statistics.activeUsers}

currently active

</p>

</div>

</div>

<div className="flex items-center gap-4">

<Users className="text-blue-600"/>

<div>

<p className="font-semibold dark:text-white">

Total Accounts

</p>

<p className="text-slate-500">

{statistics.totalUsers}

registered users

</p>

</div>

</div>

<div className="flex items-center gap-4">

<Mail className="text-purple-600"/>

<div>

<p className="font-semibold dark:text-white">

Emails Processed

</p>

<p className="text-slate-500">

{statistics.totalMails}

mails generated

</p>

</div>

</div>

<div className="flex items-center gap-4">

<ShieldCheck className="text-emerald-600"/>

<div>

<p className="font-semibold dark:text-white">

Security Status

</p>

<p className="text-green-600 font-semibold">

System Secure

</p>

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default AdminPanel;