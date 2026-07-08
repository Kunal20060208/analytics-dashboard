import {
useEffect,
useState
} from "react";



function NetworkError({children}){


const [online,setOnline]=useState(
navigator.onLine
);



useEffect(()=>{


function onlineHandler(){

setOnline(true);

}



function offlineHandler(){

setOnline(false);

}



window.addEventListener(
"online",
onlineHandler
);


window.addEventListener(
"offline",
offlineHandler
);



return()=>{


window.removeEventListener(
"online",
onlineHandler
);



window.removeEventListener(
"offline",
offlineHandler
);


}



},[]);




if(!online){


return(

<div className="
min-h-screen
flex
items-center
justify-center
bg-slate-100
p-5
">


<div className="
bg-white
rounded-3xl
shadow-xl
p-10
text-center
max-w-md
">


<h1 className="
text-5xl
mb-5
">

📡

</h1>



<h2 className="
text-3xl
font-bold
mb-3
">

No Internet Connection

</h2>



<p className="
text-gray-500
mb-5
">

Please check your internet connection and try again.

</p>



<button

onClick={()=>
window.location.reload()
}

className="
bg-purple-600
text-white
px-6
py-3
rounded-xl
"

>

Retry

</button>


</div>


</div>

)


}



return children;


}



export default NetworkError;