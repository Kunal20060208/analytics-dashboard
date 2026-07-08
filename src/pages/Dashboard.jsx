import {
useContext,
useMemo
} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KPICard from "../components/KPICard";
import Charts from "../components/Charts";
import DataTable from "../components/DataTable";
import ExportButton from "../components/ExportButton";

import { usersData } from "../data/tableData";
import { kpiData } from "../data/dashboardData";

import { LanguageContext } from "../context/LanguageContext";
import { SearchContext } from "../context/SearchContext";

function Dashboard(){

const{
t
}=useContext(LanguageContext);

const{
search
}=useContext(SearchContext);

const filteredUsers=useMemo(()=>{

if(!search.trim()){

return usersData;

}

const keyword=search.toLowerCase();

return usersData.filter(user=>

user.name.toLowerCase().includes(keyword)

||

user.email.toLowerCase().includes(keyword)

||

user.role.toLowerCase().includes(keyword)

||

user.status.toLowerCase().includes(keyword)

||

String(user.revenue).includes(keyword)

);

},[search]);

return(

<div
className="
flex
min-h-screen
bg-slate-100
dark:bg-slate-950
text-slate-900
dark:text-white
transition-colors
duration-300
"
>

<Sidebar/>

<div className="flex-1">

<Navbar/>

<main className="p-6">

<h1
className="
text-3xl
font-bold
"
>

{t.dashboard}

</h1>

<ExportButton/>

<p
className="
text-slate-600
dark:text-slate-400
mt-2
"
>

{t.track}

</p>

<div
className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
mt-8
"
>

{

kpiData.map((item,index)=>(

<KPICard

key={index}

title={item.title}

value={item.value}

growth={item.growth}

icon={item.icon}

/>

))

}

</div>

<Charts/>

<DataTable
data={filteredUsers}
/>

</main>

</div>

</div>

);

}

export default Dashboard;