import {
createContext,
useState,
useEffect
} from "react";

import {
loadCurrentUser,
saveCurrentUser,
registerUser,
loginUser,
logoutUser,
updateUserProfile,
changeUserPassword
} from "./auth/authService";

import {
getAllUsers,
editUser,
deleteUser,
updateUserBan
} from "./auth/userService";

import {
sendMail,
sendMailToUser,
broadcastMail,
getMailHistory,
markMailRead,
clearMailHistory
} from "./auth/mailService";

import {
getStatistics
} from "./auth/analyticsService";

export const AuthContext=createContext();

export function AuthProvider({children}){

const[
user,
setUser
]=useState(
loadCurrentUser()
);

useEffect(()=>{

saveCurrentUser(user);

},[user]);

function register(

name,
username,
email,
phone,
password,
role="user"

){

const result=

registerUser(

name,
username,
email,
phone,
password,
role

);

if(result.success){

setUser(result.user);

}

return result;

}

function login(

username,
password

){

const result=

loginUser(

username,
password

);

if(result.success){

setUser(result.user);

}

return result;

}

/* ---------------- LOGOUT ---------------- */

function logout(){

logoutUser();

setUser(null);

}

/* ---------------- PROFILE ---------------- */

function updateProfile(data){

if(!user){

return{

success:false,
message:"Please login first."

};

}

const updatedData={

name:data.name ?? user.name,

username:user.username,

email:user.email,

phone:user.phone,

password:data.password ?? user.password,

role:user.role,

avatar:data.avatar ?? user.avatar,

banned:user.banned,

createdAt:user.createdAt,

lastLogin:user.lastLogin

};

const result=

updateUserProfile(
user.id,
updatedData
);

if(result.success){

setUser(result.user);

}

return result;

}

/* ---------------- PASSWORD ---------------- */

function changePassword(

oldPassword,
newPassword

){

if(!user){

return{

success:false,
message:"Please login first."

};

}

const result=

changeUserPassword(

user.id,
oldPassword,
newPassword

);

if(result.success){

setUser(result.user);

}

return result;

}

/* ---------------- ADMIN ---------------- */

function adminUpdateUser(

id,
status

){

return updateUserBan(

id,
status

);

}

function updateAdminUser(

id,
data

){

const result=

editUser(

id,
data

);

if(

result.success
&&
user
&&
user.id===id

){

setUser(result.user);

}

return result;

}

function removeUser(id){

const result=

deleteUser(id);

if(

result.success
&&
user
&&
user.id===id

){

logout();

}

return result;

}

return(

<AuthContext.Provider

value={

{

user,
setUser,

register,
login,
logout,

updateProfile,
changePassword,

adminUpdateUser,

editUser:updateAdminUser,

deleteUser:removeUser,

getAllUsers,

sendMail,
sendMailToUser,
broadcastMail,

getMailHistory,
markMailRead,
clearMailHistory,

getStatistics

}

}

>

{children}

</AuthContext.Provider>

);

}

export default AuthProvider;