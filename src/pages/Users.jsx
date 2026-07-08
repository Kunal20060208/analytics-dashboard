import {
useContext,
useMemo,
useState
} from "react";

import {
Navigate
} from "react-router-dom";

import {
Search,
Ban,
UserCheck,
Trash2,
UserCog,
Send
} from "lucide-react";

import {
AuthContext
} from "../context/AuthContext";

function Users(){

const{

user,
getAllUsers,
adminUpdateUser,
deleteUser,
editUser,
sendMailToUser,
broadcastMail

}=useContext(AuthContext);

const[search,setSearch]=useState("");

const[selectedUser,setSelectedUser]=useState(null);

const[showEdit,setShowEdit]=useState(false);

const[showMail,setShowMail]=useState(false);

const[broadcast,setBroadcast]=useState(false);

const[refresh,setRefresh]=useState(0);

const users=useMemo(
()=>getAllUsers(),
[refresh]
);

const filteredUsers=users.filter(u=>

(u.name || "").toLowerCase().includes(search.toLowerCase())

||

(u.username || "").toLowerCase().includes(search.toLowerCase())

||

(u.email || "").toLowerCase().includes(search.toLowerCase())

||

(u.phone || "").includes(search)

);

if(
!user ||
user.role!=="admin"
){

return <Navigate to="/" replace/>;

}

function toggleBan(targetUser){

const result=adminUpdateUser(

targetUser.id,

!targetUser.banned

);

if(result.success){

setRefresh(v=>v+1);

}

else{

alert(result.message);

}

}

function removeUser(id){

if(!window.confirm("Delete this user?")){

return;

}

const result=deleteUser(id);

if(result.success){

setRefresh(v=>v+1);

}

else{

alert(result.message);

}

}

function saveUser(){

const result=editUser(

selectedUser.id,

{

name:document.getElementById("editName").value.trim(),

email:document.getElementById("editEmail").value.trim(),

phone:document.getElementById("editPhone").value.trim(),

role:document.getElementById("editRole").value

}

);

alert(result.message);

if(result.success){

setShowEdit(false);

setSelectedUser(null);

setRefresh(v=>v+1);

}

}

async function sendMail(){

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

let result;

if(broadcast){

result=await broadcastMail(

subject,

message

);

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

setBroadcast(false);

setSelectedUser(null);

setRefresh(v=>v+1);

}

}

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

<h1
className="
text-4xl
font-bold
dark:text-white
"
>

Users Management 👥

</h1>

<div className="mt-8 relative">

<Search
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
w-full
pl-12
pr-4
py-3
rounded-2xl
bg-white
dark:bg-slate-900
dark:text-white
shadow
outline-none
"

/>

</div>

<div
className="
mt-8
overflow-auto
rounded-3xl
bg-white
dark:bg-slate-900
shadow
"
>

<table className="w-full">

<thead>

<tr
className="
border-b
dark:border-slate-700
"
>

<th className="p-4 text-left">
Name
</th>

<th className="p-4 text-left">
Username
</th>

<th className="p-4 text-left">
Email
</th>

<th className="p-4 text-left">
Phone
</th>

<th className="p-4 text-left">
Role
</th>

<th className="p-4 text-left">
Status
</th>

<th className="p-4 text-center">
Actions
</th>

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

filteredUsers.map(currentUser=>(

<tr

key={currentUser.id}

className="
border-b
dark:border-slate-800
hover:bg-slate-50
dark:hover:bg-slate-800
transition
"

>

<td className="p-4 dark:text-white">

<div>

<div className="font-semibold">

{currentUser.name}

</div>

<div className="text-xs text-slate-500">

{currentUser.createdAt}

</div>

</div>

</td>

<td className="p-4">

@{currentUser.username}

</td>

<td className="p-4">

{currentUser.email}

</td>

<td className="p-4">

{currentUser.phone}

</td>

<td className="p-4">

<span

className={`
px-3
py-1
rounded-full
text-xs
font-semibold
${

(currentUser.role||"user")==="admin"

?

"bg-purple-600 text-white"

:

"bg-slate-200 dark:bg-slate-700 dark:text-white"

}

`}

>

{currentUser.role||"user"}

</span>

</td>

<td className="p-4">

{

currentUser.banned ?

<span className="text-red-600 font-semibold">

Banned

</span>

:

<span className="text-green-600 font-semibold">

Active

</span>

}

</td>

<td className="p-4">

<div className="flex justify-center gap-2 flex-wrap">

<button

onClick={()=>{

setSelectedUser(currentUser);

setShowEdit(true);

}}

className="
p-2
rounded-xl
bg-blue-600
hover:bg-blue-700
text-white
"

title="Edit User"

>

<UserCog size={18}/>

</button>

<button

onClick={()=>toggleBan(currentUser)}

className={`
p-2
rounded-xl
text-white
${

currentUser.banned

?

"bg-green-600 hover:bg-green-700"

:

"bg-yellow-500 hover:bg-yellow-600"

}

`}

title={

currentUser.banned

?

"Unban User"

:

"Ban User"

}

>

{

currentUser.banned ?

<UserCheck size={18}/>

:

<Ban size={18}/>

}

</button>

<button

onClick={()=>{

setSelectedUser(currentUser);

setShowMail(true);

}}

className="
p-2
rounded-xl
bg-purple-600
hover:bg-purple-700
text-white
"

title="Send Mail"

>

<Send size={18}/>

</button>

<button

onClick={()=>removeUser(currentUser.id)}

className="
p-2
rounded-xl
bg-red-600
hover:bg-red-700
text-white
"

title="Delete User"

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

{
showEdit && selectedUser &&

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
p-8
w-[520px]
space-y-5
shadow-2xl
"
>

<h2
className="
text-2xl
font-bold
dark:text-white
"
>

Edit User

</h2>

<input

id="editName"

defaultValue={selectedUser.name}

placeholder="Name"

className="
w-full
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
p-4
outline-none
"

/>

<input

id="editEmail"

defaultValue={selectedUser.email}

placeholder="Email"

className="
w-full
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
p-4
outline-none
"

/>

<input

id="editPhone"

defaultValue={selectedUser.phone}

placeholder="Phone"

className="
w-full
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
p-4
outline-none
"

/>

<select

id="editRole"

defaultValue={selectedUser.role}

className="
w-full
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
p-4
outline-none
"
>

<option value="user">

User

</option>

<option value="admin">

Admin

</option>

</select>

<div className="flex justify-end gap-4">

<button

onClick={()=>{
setShowEdit(false);
setSelectedUser(null);
}}

className="
px-5
py-3
rounded-xl
bg-slate-300
hover:bg-slate-400
"
>

Cancel

</button>

<button

onClick={saveUser}

className="
px-5
py-3
rounded-xl
bg-blue-600
hover:bg-blue-700
text-white
"
>

Save Changes

</button>

</div>

</div>

</div>

}

{
showMail && selectedUser &&

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
shadow-2xl
w-[700px]
max-w-[95vw]
p-8
"
>

<h2
className="
text-2xl
font-bold
dark:text-white
mb-4
"
>

Send Mail

</h2>

<p
className="
text-sm
text-slate-500
mb-4
"
>

Recipient :
<b className="ml-2">

{broadcast ? "All Users" : selectedUser.name}

</b>

</p>

<div className="mb-4">

<button

onClick={()=>setBroadcast(v=>!v)}

className={`
px-5
py-3
rounded-xl
text-white
font-semibold
${

broadcast

?

"bg-red-600 hover:bg-red-700"

:

"bg-purple-600 hover:bg-purple-700"

}

`}

>

{

broadcast

?

"Broadcast Mode Enabled"

:

"Send To Selected User"

}

</button>

</div>

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

rows={8}

placeholder="Write your mail..."

className="
w-full
rounded-2xl
bg-slate-100
dark:bg-slate-800
dark:text-white
p-4
outline-none
resize-none
"

/>

<div
className="
flex
justify-end
gap-4
mt-6
"
>

<button

onClick={()=>{

setShowMail(false);

setSelectedUser(null);

setBroadcast(false);

}}

className="
px-5
py-3
rounded-xl
bg-slate-300
hover:bg-slate-400
"

>

Cancel

</button>

<button

onClick={sendMail}

className="
px-5
py-3
rounded-xl
bg-green-600
hover:bg-green-700
text-white
"

>

Send Mail

</button>

</div>

</div>

</div>

}

</div>

);

}

export default Users;