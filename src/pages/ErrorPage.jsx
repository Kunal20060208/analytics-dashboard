import {
Link
} from "react-router-dom";


function ErrorPage(){


return(

<div className="
min-h-screen
flex
items-center
justify-center
flex-col
gap-5
">


<h1 className="
text-6xl
font-bold
">

404

</h1>


<p className="
text-gray-500
">

Page does not exist

</p>



<Link

to="/"

className="
bg-purple-600
text-white
px-6
py-3
rounded-xl
"

>

Return Dashboard

</Link>


</div>


)


}


export default ErrorPage;