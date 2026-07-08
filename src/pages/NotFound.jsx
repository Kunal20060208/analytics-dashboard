import {
Link
} from "react-router-dom";

import {
useContext
} from "react";

import {
ThemeContext
} from "../context/ThemeContext";



function NotFound(){

const {

dark

}=useContext(ThemeContext);



return(

<div

className={`

min-h-screen

flex

flex-col

items-center

justify-center

transition-all

duration-300

${

dark

?

"bg-slate-950 text-white"

:

"bg-slate-100 text-slate-900"

}

`}

>

<h1

className="

text-8xl

font-black

text-purple-600

"

>

404

</h1>

<h2

className="

text-3xl

font-bold

mt-4

"

>

Page Not Found

</h2>

<p

className="

mt-3

opacity-70

text-center

max-w-md

"

>

The page you are looking for doesn't exist or has been moved.

</p>

<Link

to="/"

className="

mt-8

px-8

py-4

rounded-2xl

bg-purple-600

text-white

font-semibold

hover:bg-purple-700

transition

"

>

🏠 Back to Dashboard

</Link>

</div>

);

}



export default NotFound;