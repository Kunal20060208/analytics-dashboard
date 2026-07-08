import {

useContext,

useState

} from "react";


import {

AuthContext

} from "../context/AuthContext";



import {

ThemeContext

} from "../context/ThemeContext";



function Profile(){


const {

user,

updateProfile,

logout

}=useContext(AuthContext);




const {

dark

}=useContext(ThemeContext);





const [edit,setEdit]=useState(false);





const [form,setForm]=useState({

name:user.name,

password:user.password

});






function save(){

updateProfile({

...user,

name:form.name,

password:form.password

});

setEdit(false);

}

return(



<div


className={`

min-h-screen

p-8

transition-all

duration-300


${

dark

?

"bg-slate-950"

:

"bg-slate-100"

}

`}



>



<h1


className={`

text-4xl

font-bold

mb-8


${

dark

?

"text-white"

:

"text-slate-900"

}

`}


>

Profile 👤


</h1>






<div


className={`

max-w-2xl

rounded-3xl

shadow-xl

p-8


${

dark

?

"bg-slate-900 text-white"

:

"bg-white text-slate-900"

}

`}



>





{


edit

?

(


<>


<label>Name</label>


<input


className="auth-input mb-5"


value={form.name}


onChange={e=>

setForm({

...form,

name:e.target.value

})

}



/>






<label>Password</label>


<input


type="password"


className="auth-input mb-5"


value={form.password}


onChange={e=>

setForm({

...form,

password:e.target.value

})

}



/>







<button


onClick={save}


className="

bg-green-600

text-white

px-6

py-3

rounded-xl

"


>

Save Changes


</button>


</>



)

:

(

<>



<div className="space-y-4 text-lg">


<p>

<b>Name:</b> {user.name}

</p>


<p>

<b>Username:</b> {user.username}

</p>


<p>

<b>Email:</b> {user.email}

</p>


<p>

<b>Mobile:</b> {user.phone}

</p>



</div>







<div className="mt-8 flex gap-4">


<button


onClick={()=>setEdit(true)}


className="

bg-purple-600

text-white

px-6

py-3

rounded-xl

"


>

Edit Profile


</button>






<button


onClick={logout}


className="

bg-red-500

text-white

px-6

py-3

rounded-xl

"


>

Logout


</button>


</div>



</>


)


}







</div>



</div>


)


}



export default Profile;