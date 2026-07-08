import {
LayoutDashboard,
Users,
BarChart3,
Inbox,
HelpCircle
} from "lucide-react";

import {
NavLink
} from "react-router-dom";

import {
useContext
} from "react";

import {
AuthContext
} from "../context/AuthContext";

function Sidebar(){

const{
user
}=useContext(AuthContext);

const links=[

{
name:"Dashboard",
path:"/",
icon:<LayoutDashboard/>
},

{
name:"Inbox",
path:"/inbox",
icon:<Inbox/>
},

{
name:"Help & Support",
path:"/support",
icon:<HelpCircle/>
}

];

if(user?.role==="admin"){

links.splice(1,0,

{
name:"Users",
path:"/users",
icon:<Users/>
},

{
name:"Analytics",
path:"/analytics",
icon:<BarChart3/>
}

);

}

return(

<aside
className="
w-52
min-h-screen
bg-white
dark:bg-slate-900
border-r
dark:border-slate-800
p-5
"
>

<h1
className="
text-xl
font-bold
dark:text-white
mb-8
"
>

AnalyticsPro

</h1>

<div className="space-y-3">

{

links.map(item=>(

<NavLink

key={item.path}

to={item.path}

className={({isActive})=>

`
flex
items-center
gap-3
px-4
py-3
rounded-xl
transition

${

isActive

?

"bg-purple-600 text-white"

:

"dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"

}

`

}

>

{item.icon}

{item.name}

</NavLink>

))

}

</div>

</aside>

);

}

export default Sidebar;