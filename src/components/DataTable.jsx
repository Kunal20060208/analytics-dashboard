import {
useMemo,
useContext,
useState
} from "react";

import {
RotateCcw,
ChevronUp,
ChevronDown
} from "lucide-react";

import {
SettingsContext
} from "../context/SettingsContext";

function DataTable({data}){

const[roleFilter,setRoleFilter]=useState("All");

const[statusFilter,setStatusFilter]=useState("All");

const[sortBy,setSortBy]=useState("id");

const[sortOrder,setSortOrder]=useState("asc");

const{rowsPerPage,setRowsPerPage}=useContext(SettingsContext);

const[currentPage,setCurrentPage]=useState(1);

const roleOptions=useMemo(

()=>

["All",...new Set(data.map(user=>user.role))],

[data]

);

const statusOptions=useMemo(

()=>

["All",...new Set(data.map(user=>user.status))],

[data]

);

const filteredData=useMemo(()=>{

let users=[...data];

users=users.filter(user=>{

const matchesRole=

roleFilter==="All"

||

user.role===roleFilter;

const matchesStatus=

statusFilter==="All"

||

user.status===statusFilter;

return(

matchesRole

&&

matchesStatus

);

});

users.sort((a,b)=>{

let first=a[sortBy];

let second=b[sortBy];

if(typeof first==="string"){

first=first.toLowerCase();

second=second.toLowerCase();

}

if(first<second){

return sortOrder==="asc"

?

-1

:

1;

}

if(first>second){

return sortOrder==="asc"

?

1

:

-1;

}

return 0;

});

return users;

},[
data,
roleFilter,
statusFilter,
sortBy,
sortOrder
]);

const safeRows=

rowsPerPage>0
?
rowsPerPage
:
10;

const totalPages=Math.max(

1,

Number.isFinite(Math.ceil(filteredData.length/safeRows))
?

Math.ceil(filteredData.length/safeRows)

:

1

);

const paginatedData=filteredData.slice(

(currentPage-1)*safeRows,

currentPage*safeRows

);

function changeSort(column){

if(sortBy===column){

setSortOrder(

sortOrder==="asc"

?

"desc"

:

"asc"

);

}

else{

setSortBy(column);

setSortOrder("asc");

}

}

function renderArrow(column){

if(sortBy!==column){

return null;

}

return sortOrder==="asc"

?

<ChevronUp size={16}/>

:

<ChevronDown size={16}/>;

}

function resetFilters(){

setRoleFilter("All");

setStatusFilter("All");

setSortBy("id");

setSortOrder("asc");

setRowsPerPage(10);

setCurrentPage(1);

}

return(

<div
className="
mt-10
bg-white
dark:bg-slate-900
rounded-3xl
p-6
overflow-x-auto
"
>

<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

<h2
className="
text-xl
font-bold
dark:text-white
"
>

Users Analytics

</h2>

<div className="flex flex-wrap gap-3">

<select

value={roleFilter}

onChange={e=>{

setRoleFilter(e.target.value);

setCurrentPage(1);

}}

className="
px-4
py-3
rounded-xl
border
dark:bg-slate-800
dark:border-slate-700
dark:text-white
"

>

{

roleOptions.map(role=>(

<option

key={role}

value={role}

>

{role}

</option>

))

}

</select>

<select

value={statusFilter}

onChange={e=>{

setStatusFilter(e.target.value);

setCurrentPage(1);

}}

className="
px-4
py-3
rounded-xl
border
dark:bg-slate-800
dark:border-slate-700
dark:text-white
"

>

{

statusOptions.map(status=>(

<option

key={status}

value={status}

>

{status}

</option>

))

}

</select>

<select

value={safeRows}

onChange={e=>{

setRowsPerPage(Number(e.target.value));

setCurrentPage(1);

}}

className="
px-4
py-3
rounded-xl
border
dark:bg-slate-800
dark:border-slate-700
dark:text-white
"

>

<option value={5}>5 Rows</option>

<option value={10}>10 Rows</option>

<option value={20}>20 Rows</option>

<option value={50}>50 Rows</option>

</select>

<button

onClick={resetFilters}

className="
flex
items-center
gap-2
bg-red-600
hover:bg-red-700
text-white
px-4
py-3
rounded-xl
"

>

<RotateCcw size={18}/>

Reset

</button>

</div>

</div>

<div className="mt-6 overflow-x-auto">

<table className="w-full">

<thead>

<tr
className="
border-b
dark:border-slate-700
text-left
dark:text-slate-300
"
>

<th
className="py-4 cursor-pointer"
onClick={()=>changeSort("id")}
>

<div className="flex items-center gap-1">

S.No.

{renderArrow("id")}

</div>

</th>

<th
className="py-4 cursor-pointer"
onClick={()=>changeSort("name")}
>

<div className="flex items-center gap-1">

Name

{renderArrow("name")}

</div>

</th>

<th
className="py-4 cursor-pointer"
onClick={()=>changeSort("email")}
>

<div className="flex items-center gap-1">

Email

{renderArrow("email")}

</div>

</th>

<th
className="py-4 cursor-pointer"
onClick={()=>changeSort("role")}
>

<div className="flex items-center gap-1">

Role

{renderArrow("role")}

</div>

</th>

<th
className="py-4 cursor-pointer"
onClick={()=>changeSort("status")}
>

<div className="flex items-center gap-1">

Status

{renderArrow("status")}

</div>

</th>

<th
className="py-4 cursor-pointer"
onClick={()=>changeSort("revenue")}
>

<div className="flex items-center gap-1">

Revenue

{renderArrow("revenue")}

</div>

</th>

</tr>

</thead>

<tbody>

{

paginatedData.length===0

?

<tr>

<td
colSpan={6}
className="
text-center
py-10
text-slate-500
"
>

No users found.

</td>

</tr>

:

paginatedData.map((user,index)=>(

<tr

key={user.id ?? index}

className="
border-t
dark:border-slate-700
dark:text-white
hover:bg-slate-50
dark:hover:bg-slate-800
transition
"

>

<td className="py-4 font-semibold">

{user.id}

</td>

<td className="py-4">

{user.name}

</td>

<td>

{user.email}

</td>

<td>

{user.role}

</td>

<td>

<span
className={`
px-3
py-1
rounded-full
text-white
text-sm
${

user.status==="Active"

?

"bg-green-500"

:

"bg-red-500"

}
`}
>

{user.status}

</span>

</td>

<td>

₹{user.revenue.toLocaleString()}

</td>

</tr>

))

}

</tbody>

</table>

</div>

<div
className="
flex
flex-col
md:flex-row
justify-between
items-center
gap-4
mt-8
"
>

<div
className="
text-sm
text-slate-500
dark:text-slate-400
"
>

Showing

<b className="mx-1">

{

filteredData.length===0

?

0

:

(currentPage-1)*safeRows+1

}

</b>

to

<b className="mx-1">

{

Math.min(

currentPage*safeRows,

filteredData.length

)

}

</b>

of

<b className="mx-1">

{filteredData.length}

</b>

users

</div>

<div className="flex items-center gap-2 flex-wrap">

<button

disabled={currentPage===1}

onClick={()=>setCurrentPage(1)}

className="
px-4
py-2
rounded-xl
bg-slate-200
dark:bg-slate-700
disabled:opacity-50
"

>

First

</button>

<button

disabled={currentPage===1}

onClick={()=>setCurrentPage(p=>p-1)}

className="
px-4
py-2
rounded-xl
bg-slate-200
dark:bg-slate-700
disabled:opacity-50
"

>

Previous

</button>

{
Array.from(

{

length:totalPages

},

(_,i)=>(

<button

key={i}

onClick={()=>setCurrentPage(i+1)}

className={`
px-4
py-2
rounded-xl
transition
${

currentPage===i+1

?

"bg-purple-600 text-white"

:

"bg-slate-200 dark:bg-slate-700 dark:text-white"

}
`}

>

{i+1}

</button>

)

)

}

<button

disabled={currentPage===totalPages || totalPages===0}

onClick={()=>setCurrentPage(p=>p+1)}

className="
px-4
py-2
rounded-xl
bg-slate-200
dark:bg-slate-700
disabled:opacity-50
"

>

Next

</button>

<button

disabled={currentPage===totalPages || totalPages===0}

onClick={()=>setCurrentPage(totalPages)}

className="
px-4
py-2
rounded-xl
bg-slate-200
dark:bg-slate-700
disabled:opacity-50
"

>

Last

</button>

</div>

</div>

</div>

);

}

export default DataTable;