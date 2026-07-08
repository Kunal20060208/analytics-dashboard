import {
Navigate,
useLocation
} from "react-router-dom";

import {
useContext
} from "react";

import {
AuthContext
} from "../context/AuthContext";

function AdminRoute({children}){

const{
user
}=useContext(AuthContext);

const location=useLocation();

if(!user){

return(

<Navigate

to="/login"

replace

state={{
from:location
}}

/>

);

}

if(

user.role!=="admin"

){

return(

<Navigate

to="/dashboard"

replace

state={{
from:location
}}

/>

);

}

return children;

}

export default AdminRoute;