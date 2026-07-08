import {

DollarSign,

Users,

ShoppingCart,

TrendingUp

} from "lucide-react";




function KPICard({

title,

value,

growth,

icon

}){



const icons={


revenue:<DollarSign size={28}/>,

users:<Users size={28}/>,

orders:<ShoppingCart size={28}/>,

growth:<TrendingUp size={28}/>


};





return(


<div className="

bg-white

dark:bg-slate-900

rounded-2xl

p-6

shadow

border

dark:border-slate-800

transition

">



<div className="flex justify-between">



<div>


<p className="

text-slate-500

dark:text-slate-400

">

{title}

</p>




<h2 className="

text-3xl

font-bold

dark:text-white

">

{value}

</h2>



<p className="text-green-500">

↑ {growth}

</p>



</div>





<div className="

text-purple-600

dark:text-purple-400

">

{icons[icon]}


</div>




</div>



</div>


)


}


export default KPICard;