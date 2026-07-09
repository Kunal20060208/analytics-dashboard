import {
getUsers,
saveUsers
} from "./storage";

import {
sendMail
} from "./mailService";



export function registerUser(
name,
username,
email,
phone,
password,
role="user"
){

let users=getUsers();

username=username.trim();
email=email.trim().toLowerCase();
phone=phone.trim();

if(

users.some(
u=>u.username.toLowerCase()===username.toLowerCase()
)

){

return{

success:false,
message:"Username already exists."

};

}

if(

users.some(
u=>u.email.toLowerCase()===email
)

){

return{

success:false,
message:"Email already registered."

};

}

if(

users.some(
u=>u.phone===phone
)

){

return{

success:false,
message:"Phone number already registered."

};

}

const newUser={

id:Date.now(),

name,

username,

email,

phone,

password,

role:
username.trim().toLowerCase()==="admin"
? "admin"
: role,

banned:false,

avatar:null,

createdAt:new Date().toLocaleString(),

lastLogin:null

};

users.push(newUser);

saveUsers(users);

sendMail(

newUser,

"Welcome to Analytics Dashboard",

`Hello {name},

Welcome to Analytics Dashboard.

Your account has been created successfully.

Username : {username}
Email : {email}
Phone : {phone}

Thank you.`

);

return{

success:true,

user:newUser

};

}



export function loginUser(

username,

password

){

const users=getUsers();

const user=users.find(

u=>

u.username===username.trim()

&&

u.password===password

);

if(!user){

return{

success:false,

message:"Invalid username or password."

};

}

if(user.banned){

return{

success:false,

message:"Your account has been banned."

};

}

user.lastLogin=new Date().toLocaleString();

saveUsers(users);

return{

success:true,

user

};

}



export function updateUserProfile(

currentUser,

data

){

let users=getUsers();

users=users.map(

u=>

u.id===currentUser.id

?

{

...u,

name:data.name,

email:data.email,

phone:data.phone,

avatar:data.avatar??u.avatar

}

:

u

);

saveUsers(users);

const updated=

users.find(

u=>u.id===currentUser.id

);

sendMail(

updated,

"Profile Updated",

"Hello {name}, your profile has been updated successfully."

);

return{

success:true,

user:updated

};

}



export function changeUserPassword(

currentUser,

oldPassword,

newPassword

){

if(

currentUser.password!==oldPassword

){

return{

success:false,

message:"Current password is incorrect."

};

}

let users=getUsers();

users=users.map(

u=>

u.id===currentUser.id

?

{

...u,

password:newPassword

}

:

u

);

saveUsers(users);

const updated=

users.find(

u=>u.id===currentUser.id

);

sendMail(

updated,

"Password Changed",

"Hello {name}, your password was changed successfully."

);

return{

success:true,

user:updated

};

}



export function logoutUser(){

localStorage.removeItem("currentUser");

}



export function saveCurrentUser(user){

localStorage.setItem(

"currentUser",

JSON.stringify(user)

);

}



export function loadCurrentUser(){

const user=localStorage.getItem("currentUser");

if(

!user ||

user==="undefined" ||

user==="null"

){

return null;

}

try{

return JSON.parse(user);

}

catch{

localStorage.removeItem("currentUser");

return null;

}

}