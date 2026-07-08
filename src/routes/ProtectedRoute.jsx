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



function ProtectedRoute({children}){

const {

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



return children;

}



export default ProtectedRoute;