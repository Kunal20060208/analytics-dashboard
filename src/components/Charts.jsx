import {
Line,
Bar,
Pie
} from "react-chartjs-2";

import {

Chart as ChartJS,

CategoryScale,

LinearScale,

PointElement,

LineElement,

BarElement,

ArcElement,

Title,

Tooltip,

Legend,

Filler

} from "chart.js";

import {

revenueData,

userData,

salesData,

categoryData

} from "../data/chartData";

ChartJS.register(

CategoryScale,

LinearScale,

PointElement,

LineElement,

BarElement,

ArcElement,

Title,

Tooltip,

Legend,

Filler

);

function Charts(){

const monthNames=[

"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec"

];

const currentMonth=new Date().getMonth();

const revenueChartData=revenueData.slice(

0,

currentMonth+1

);

const userGrowthData=userData.slice(

0,

currentMonth+1

);

const revenueChart={

labels:revenueChartData.map(

item=>item.month

),

datasets:[

{

label:"Revenue",

data:revenueChartData.map(

item=>item.revenue

),

borderColor:"#9333ea",

backgroundColor:"rgba(147,51,234,0.25)",

fill:true,

tension:0.4,

pointRadius:5,

pointHoverRadius:7

}

]

};

const userChart={

labels:userGrowthData.map(

item=>item.month

),

datasets:[

{

label:"Users",

data:userGrowthData.map(

item=>item.users

),

borderColor:"#2563eb",

backgroundColor:"rgba(37,99,235,0.25)",

fill:true,

tension:0.4,

pointRadius:5,

pointHoverRadius:7

}

]

};

const salesChart={

labels:salesData.map(

item=>item.name

),

datasets:[

{

label:"Sales",

data:salesData.map(

item=>item.sales

),

backgroundColor:[

"#9333ea",

"#2563eb",

"#10b981",

"#f59e0b"

],

borderRadius:10

}

]

};

const categoryChart={

labels:categoryData.map(

item=>item.name

),

datasets:[

{

label:"Categories",

data:categoryData.map(

item=>item.value

),

backgroundColor:[

"#9333ea",

"#2563eb",

"#10b981",

"#f97316"

]

}

]

};

const commonOptions={

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

position:"top"

},

title:{

display:false

}

},

interaction:{

mode:"index",

intersect:false

},

scales:{

y:{

beginAtZero:true

}

}

};

return(

<div className="space-y-8 mt-10">

    <div
className="
grid
grid-cols-1
xl:grid-cols-2
gap-8
"
>

<div
className="
bg-white
dark:bg-slate-900
p-6
rounded-3xl
shadow-lg
"
>

<div className="flex justify-between items-center mb-5">

<div>

<h2
className="
text-xl
font-bold
dark:text-white
"
>

Revenue Analytics

</h2>

<p
className="
text-sm
text-slate-500
dark:text-slate-400
mt-1
"
>

Monthly revenue till current month

</p>

</div>

<div
className="
bg-purple-100
dark:bg-purple-900/30
text-purple-700
dark:text-purple-300
px-4
py-2
rounded-xl
font-semibold
"
>

₹

{

revenueChartData.reduce(

(sum,item)=>sum+item.revenue,

0

).toLocaleString()

}

</div>

</div>

<div className="h-[350px]">

<Line

data={revenueChart}

options={commonOptions}

/>

</div>

</div>

<div
className="
bg-white
dark:bg-slate-900
p-6
rounded-3xl
shadow-lg
"
>

<div className="flex justify-between items-center mb-5">

<div>

<h2
className="
text-xl
font-bold
dark:text-white
"
>

User Growth

</h2>

<p
className="
text-sm
text-slate-500
dark:text-slate-400
mt-1
"
>

Monthly registered users

</p>

</div>

<div
className="
bg-blue-100
dark:bg-blue-900/30
text-blue-700
dark:text-blue-300
px-4
py-2
rounded-xl
font-semibold
"
>

{

userGrowthData[

userGrowthData.length-1

]?.users

}

Users

</div>

</div>

<div className="h-[350px]">

<Line

data={userChart}

options={commonOptions}

/>

</div>

</div>

</div>

<div
className="
grid
grid-cols-1
xl:grid-cols-2
gap-8
"
>

<div
className="
bg-white
dark:bg-slate-900
p-6
rounded-3xl
shadow-lg
"
>

<div className="flex justify-between items-center mb-5">

<div>

<h2
className="
text-xl
font-bold
dark:text-white
"
>

Product Sales

</h2>

<p
className="
text-sm
text-slate-500
dark:text-slate-400
mt-1
"
>

Sales comparison by product

</p>

</div>

<div
className="
bg-green-100
dark:bg-green-900/30
text-green-700
dark:text-green-300
px-4
py-2
rounded-xl
font-semibold
"
>

{

salesData.reduce(

(sum,item)=>sum+item.sales,

0

)

}

Units

</div>

</div>

<div className="h-[350px]">

<Bar

data={salesChart}

options={commonOptions}

/>

</div>

</div>

<div
className="
bg-white
dark:bg-slate-900
p-6
rounded-3xl
shadow-lg
"
>

<div className="flex justify-between items-center mb-5">

<div>

<h2
className="
text-xl
font-bold
dark:text-white
"
>

Category Distribution

</h2>

<p
className="
text-sm
text-slate-500
dark:text-slate-400
mt-1
"
>

Sales percentage by category

</p>

</div>

<div
className="
bg-orange-100
dark:bg-orange-900/30
text-orange-700
dark:text-orange-300
px-4
py-2
rounded-xl
font-semibold
"
>

100%

</div>

</div>

<div className="h-[350px] flex justify-center items-center">

<Pie

data={categoryChart}

options={

{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

position:"bottom"

}

}

}

}

/>

</div>

</div>

</div>

</div>

);

}

export default Charts;