import {
Search,
Moon,
Sun,
User
} from "lucide-react";

import {
useContext,
useState,
useEffect,
useRef
} from "react";

import {
Link
} from "react-router-dom";

import {
ThemeContext
} from "../context/ThemeContext";

import {
AuthContext
} from "../context/AuthContext";

import {
SearchContext
} from "../context/SearchContext";

function Navbar(){

const{
dark,
setDark
}=useContext(ThemeContext);

const{
user
}=useContext(AuthContext);

const{
search,
setSearch
}=useContext(SearchContext);

const[
open,
setOpen
]=useState(false);

const menuRef=useRef(null);

useEffect(()=>{

function handleClickOutside(event){

if(
menuRef.current &&
!menuRef.current.contains(event.target)
){
setOpen(false);
}

}

document.addEventListener(
"mousedown",
handleClickOutside
);

return()=>{

document.removeEventListener(
"mousedown",
handleClickOutside
);

};

},[]);

return(

<header
className="
h-16
bg-white
dark:bg-slate-900
border-b
dark:border-slate-800
flex
items-center
justify-between
px-6
transition
">

<div className="flex items-center gap-3">

<Search
size={20}
className="text-slate-500"
/>

<input

type="text"

placeholder="Search analytics..."

value={search}

onChange={e=>setSearch(e.target.value)}

className="
bg-slate-100
dark:bg-slate-800
dark:text-white
px-4
py-2
rounded-xl
outline-none
w-80
transition
"

autoComplete="off"

/>

</div>

<div className="flex items-center gap-3">

<button

onClick={()=>setDark(!dark)}

className="
p-3
rounded-xl
bg-slate-100
dark:bg-slate-800
hover:scale-105
transition
"

>

{

dark

?

<Sun size={20}/>

:

<Moon size={20}/>

}

</button>

<div
className="relative"
ref={menuRef}
>

<button

onClick={()=>setOpen(!open)}

className="
p-3
rounded-xl
bg-purple-600
hover:bg-purple-700
text-white
transition
"

>

<User size={20}/>

</button>

{

open &&

<div
className="
absolute
right-0
mt-3
w-60
bg-white
dark:bg-slate-900
shadow-xl
rounded-2xl
p-3
border
dark:border-slate-700
z-50
"
>

<Link
to="/profile"
onClick={()=>setOpen(false)}
className="
block
p-3
rounded-xl
hover:bg-slate-100
dark:hover:bg-slate-800
transition
"
>

👤 View Profile

</Link>

<Link
to="/settings"
onClick={()=>setOpen(false)}
className="
block
p-3
rounded-xl
hover:bg-slate-100
dark:hover:bg-slate-800
transition
"
>

⚙️ Settings

</Link>

{

user?.role==="admin" &&

<Link
to="/admin"
onClick={()=>setOpen(false)}
className="
block
p-3
rounded-xl
hover:bg-slate-100
dark:hover:bg-slate-800
transition
"
>

🛡 Admin Panel

</Link>

}

</div>

}

</div>

</div>

</header>

);

}

export default Navbar;