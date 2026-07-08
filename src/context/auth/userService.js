import {
getUsers,
saveUsers
} from "./storage";

/* ===================================================
   REGISTER USER
=================================================== */

export function registerUser({
name,
username,
email,
phone,
password
}){

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

role:"user",

banned:false,

avatar:null,

createdAt:new Date().toLocaleString(),

lastLogin:null

};

users.push(newUser);

saveUsers(users);

return{

success:true,

message:"Account created successfully.",

user:newUser

};

}

/* ===================================================
   LOGIN
=================================================== */

export function loginUser(
username,
password
){

const users=getUsers();

const found=users.find(

u=>

u.username===username.trim()

&&

u.password===password

);

if(!found){

return{

success:false,

message:"Invalid username or password."

};

}

if(found.banned){

return{

success:false,

message:"Your account has been banned."

};

}

found.lastLogin=new Date().toLocaleString();

const updatedUsers=users.map(

u=>

u.id===found.id

?

found

:

u

);

saveUsers(updatedUsers);

return{

success:true,

message:"Login successful.",

user:found

};

}

/* ===================================================
   UPDATE PROFILE
=================================================== */

export function updateUserProfile(
id,
data
){

let users=getUsers();

users=users.map(

u=>

u.id===id

?

{

...u,

...data

}

:

u

);

saveUsers(users);

const updatedUser=users.find(

u=>u.id===id

);

return{

success:true,

message:"Profile updated successfully.",

user:updatedUser

};

}

/* ===================================================
   CHANGE PASSWORD
=================================================== */

export function changeUserPassword(
id,
oldPassword,
newPassword
){

let users=getUsers();

const user=users.find(

u=>u.id===id

);

if(!user){

return{

success:false,

message:"User not found."

};

}

if(user.password!==oldPassword){

return{

success:false,

message:"Current password is incorrect."

};

}

user.password=newPassword;

saveUsers(users);

return{

success:true,

message:"Password changed successfully.",

user

};

}

/* ===================================================
   EDIT USER (ADMIN)
=================================================== */

export function editUser(
id,
data
){

let users=getUsers();

const index=users.findIndex(

u=>u.id===id

);

if(index===-1){

return{

success:false,

message:"User not found."

};

}

/* Prevent duplicate username */

if(

data.username &&

users.some(

u=>

u.id!==id &&

u.username.toLowerCase()===data.username.trim().toLowerCase()

)

){

return{

success:false,

message:"Username already exists."

};

}

/* Prevent duplicate email */

if(

data.email &&

users.some(

u=>

u.id!==id &&

u.email.toLowerCase()===data.email.trim().toLowerCase()

)

){

return{

success:false,

message:"Email already exists."

};

}

/* Prevent duplicate phone */

if(

data.phone &&

users.some(

u=>

u.id!==id &&

u.phone===data.phone.trim()

)

){

return{

success:false,

message:"Phone number already exists."

};

}

users[index]={

...users[index],

...data

};

saveUsers(users);

return{

success:true,

message:"User updated successfully.",

user:users[index]

};

}

/* ===================================================
   DELETE USER
=================================================== */

export function deleteUser(id){

let users=getUsers();

users=users.filter(

u=>u.id!==id

);

saveUsers(users);

return{

success:true,

message:"User deleted successfully."

};

}

/* ===================================================
   UPDATE ROLE
=================================================== */

export function updateUserRole(
id,
role
){

let users=getUsers();

users=users.map(

u=>

u.id===id

?

{

...u,

role

}

:

u

);

saveUsers(users);

return{

success:true,

message:"User role updated successfully."

};

}

/* ===================================================
   BAN / UNBAN
=================================================== */

export function updateUserBan(
id,
banned
){

let users=getUsers();

users=users.map(

u=>

u.id===id

?

{

...u,

banned

}

:

u

);

saveUsers(users);

return{

success:true,

message:banned
?"User banned successfully."
:"User unbanned successfully."

};

}

/* ===================================================
   GET USER
=================================================== */

export function getUserById(id){

return getUsers().find(

u=>u.id===id

);

}

export function getUserByUsername(username){

return getUsers().find(

u=>

u.username.toLowerCase()===username.toLowerCase()

);

}

export function getAllUsers(){

return getUsers();

}