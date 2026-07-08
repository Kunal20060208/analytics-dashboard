import {

getUsers,

saveUsers,

generateId

} from "./storage";



export const DEFAULT_ADMIN={

id:0,

name:"Administrator",

username:"admin",

email:"admin123@gmail.com",

phone:"+91123456789",

password:"Admin123",

role:"admin",

banned:false,

avatar:null,

createdAt:new Date().toLocaleString(),

lastLogin:null

};



export function ensureAdminExists(){

let users=getUsers();



const adminExists=users.some(

user=>

user.role==="admin"

);



if(adminExists){

return;

}



const admin={

...DEFAULT_ADMIN,

id:generateId()

};



users.unshift(admin);



saveUsers(users);

}



export function getAdmin(){

const users=getUsers();



const admin=users.find(

user=>user.role==="admin"

);



return admin||null;

}



export function isAdmin(user){

if(!user){

return false;

}



return user.role==="admin";

}



export function makeAdmin(userId){

let users=getUsers();



users=users.map(user=>

user.id===userId

?

{

...user,

role:"admin"

}

:

user

);



saveUsers(users);

}



export function removeAdmin(userId){

let users=getUsers();



const admins=users.filter(

user=>user.role==="admin"

);



if(admins.length<=1){

return{

success:false,

message:"At least one admin account is required."

};

}



users=users.map(user=>

user.id===userId

?

{

...user,

role:"user"

}

:

user

);



saveUsers(users);



return{

success:true

};

}



export function adminCount(){

return getUsers().filter(

user=>user.role==="admin"

).length;

}



export function userCount(){

return getUsers().filter(

user=>user.role==="user"

).length;

}



export function getAllAccounts(){

return getUsers();

}