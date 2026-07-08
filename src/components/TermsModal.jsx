import {
X
} from "lucide-react";



function TermsModal({close}){


return(


<div className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
p-5
z-50
">


<div className="
bg-white
dark:bg-slate-900
rounded-3xl
max-w-lg
w-full
p-8
shadow-2xl
"


>


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-3xl
font-bold
text-slate-900
dark:text-white
">

Terms & Conditions

</h2>


<button

onClick={close}

className="
text-slate-500
dark:text-white
"

>

<X/>

</button>


</div>




<div className="
space-y-4
text-slate-600
dark:text-slate-300
text-sm
h-72
overflow-y-auto
">


<p>

By creating an account, you agree to use this analytics platform responsibly.

</p>


<p>

You must provide accurate information during registration.

</p>


<p>

Your account credentials should not be shared with anyone else.

</p>


<p>

Any misuse, unauthorized access attempts, or harmful activity may result in account suspension.

</p>


<p>

User information will be handled according to our privacy practices.

</p>


<p>

The platform owner may update these terms in the future.

</p>


</div>



<button


onClick={close}


className="
mt-6
w-full
bg-purple-600
hover:bg-purple-700
text-white
py-3
rounded-xl
font-semibold
"


>

I Agree

</button>



</div>


</div>


)


}


export default TermsModal;