import React from "react";


class ErrorBoundary extends React.Component{


constructor(props){

super(props);

this.state={
hasError:false
}

}



static getDerivedStateFromError(){

return {

hasError:true

}

}



componentDidCatch(error,info){

console.log(
"Application Error:",
error,
info
);

}



render(){


if(this.state.hasError){


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

⚠️

</h1>


<h2 className="
text-3xl
font-bold
mb-3
">

Something went wrong

</h2>



<p className="
text-gray-500
mb-6
">

The application crashed unexpectedly.

Please refresh the page.

</p>



<button

onClick={()=>window.location.reload()}

className="
bg-black
text-white
px-6
py-3
rounded-xl
"

>

Reload App

</button>


</div>


</div>


)

}


return this.props.children;


}


}


export default ErrorBoundary;