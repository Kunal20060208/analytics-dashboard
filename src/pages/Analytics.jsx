import {
useContext,
useMemo
} from "react";

import { Navigate } from "react-router-dom";

import {
AuthContext
} from "../context/AuthContext";

import {
Bar,
Pie,
Line
} from "react-chartjs-2";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
ArcElement,
PointElement,
LineElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
ArcElement,
PointElement,
LineElement,
Tooltip,
Legend
);

function Analytics(){

const{
user,
getStatistics,
getAllUsers,
getMailHistory
}=useContext(AuthContext);

const stats=getStatistics();

const users=useMemo(
()=>getAllUsers(),
[]
);

const mails=useMemo(
()=>getMailHistory(),
[]
);

const activeUsers=users.filter(
u=>!u.banned
).length;

const bannedUsers=users.filter(
u=>u.banned
).length;

const roleCounts={

Admin:1,

User:users.length

};

const pieData={

labels:[
"Active",
"Banned"
],

datasets:[

{

label:"Users",

data:[
activeUsers,
bannedUsers
]

}

]

};

const barData={

labels:[
"Users",
"Mails"
],

datasets:[

{

label:"Total",

data:[
users.length,
mails.length
]

}

]

};

const lineData={

labels:[
"Registered",
"Active",
"Banned",
"Mails"
],

datasets:[

{

label:"Analytics",

data:[

users.length,

activeUsers,

bannedUsers,

mails.length

],

fill:false

}

]

};

if(
!user ||
user.role!=="admin"
){

return <Navigate to="/dashboard" replace />;

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

Analytics Dashboard 📈

</h1>

<div
className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
mt-8
"
>

<div
className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow
p-6
"
>

<h3>Total Users</h3>

<h1
className="
text-4xl
font-bold
mt-3
dark:text-white
"
>

{stats.totalUsers}

</h1>

</div>

<div
className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow
p-6
"
>

<h3>Active Users</h3>

<h1
className="
text-4xl
font-bold
mt-3
text-green-500
"
>

{stats.activeUsers}

</h1>

</div>

<div
className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow
p-6
"
>

<h3>Banned Users</h3>

<h1
className="
text-4xl
font-bold
mt-3
text-red-500
"
>

{stats.bannedUsers}

</h1>

</div>

<div
className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow
p-6
"
>

<h3>Total Emails</h3>

<h1
className="
text-4xl
font-bold
mt-3
text-purple-500
"
>

{stats.totalMails}

</h1>

</div>

</div>

<div
className="
grid
grid-cols-1
xl:grid-cols-2
gap-8
mt-10
"
>

<div
className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow
p-6
"
>

<h2
className="
text-2xl
font-bold
mb-5
dark:text-white
"
>

User Status

</h2>

<Pie data={pieData}/>

</div>

<div
className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow
p-6
"
>

<h2
className="
text-2xl
font-bold
mb-5
dark:text-white
"
>

System Totals

</h2>

<Bar data={barData}/>

</div>

</div>

<div
className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow
p-6
mt-10
"
>

<h2
className="
text-2xl
font-bold
mb-5
dark:text-white
"
>

Growth Overview

</h2>

<Line data={lineData}/>

</div>

<div
className="
bg-white
dark:bg-slate-900
rounded-3xl
shadow
p-6
mt-10
"
>

<h2
className="
text-2xl
font-bold
mb-6
dark:text-white
"
>

Quick Statistics

</h2>

<div
className="
grid
grid-cols-2
gap-6
"
>

<div>

<h3 className="font-semibold">

Registered Users

</h3>

<p className="text-3xl font-bold">

{users.length}

</p>

</div>

<div>

<h3 className="font-semibold">

Emails Sent

</h3>

<p className="text-3xl font-bold">

{mails.length}

</p>

</div>

<div>

<h3 className="font-semibold">

Admin Accounts

</h3>

<p className="text-3xl font-bold">

{roleCounts.Admin}

</p>

</div>

<div>

<h3 className="font-semibold">

User Accounts

</h3>

<p className="text-3xl font-bold">

{roleCounts.User}

</p>

</div>

</div>

</div>

</div>

);

}

export default Analytics;