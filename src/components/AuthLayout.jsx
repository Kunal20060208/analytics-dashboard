import {
motion
} from "framer-motion";



function AuthLayout({
children,
title,
subtitle
}){


return(


<div className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-indigo-600
via-purple-600
to-pink-600
p-6
">


<motion.div


initial={{
opacity:0,
y:30
}}


animate={{
opacity:1,
y:0
}}



className="
w-full
max-w-lg
bg-white
dark:bg-slate-900
rounded-3xl
shadow-2xl
p-10
"


>


<h1 className="
text-4xl
font-bold
text-center
text-slate-900
dark:text-white
mb-4
">

{title}

</h1>


<p className="
text-center
text-slate-500
dark:text-slate-400
mb-10
">

{subtitle}

</p>



{children}



</motion.div>


</div>


)


}


export default AuthLayout;