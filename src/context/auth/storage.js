export const USERS_KEY="users";

export const MAILS_KEY="mails";

export const CURRENT_USER_KEY="currentUser";



export function getUsers(){

return JSON.parse(

localStorage.getItem(USERS_KEY)

)||[];

}



export function saveUsers(users){

localStorage.setItem(

USERS_KEY,

JSON.stringify(users)

);

}



export function getCurrentUser(){

return JSON.parse(

localStorage.getItem(CURRENT_USER_KEY)

)||null;

}



export function saveCurrentUser(user){

if(user){

localStorage.setItem(

CURRENT_USER_KEY,

JSON.stringify(user)

);

}

else{

localStorage.removeItem(

CURRENT_USER_KEY

);

}

}



export function getMails(){

return JSON.parse(

localStorage.getItem(MAILS_KEY)

)||[];

}



export function saveMails(mails){

localStorage.setItem(

MAILS_KEY,

JSON.stringify(mails)

);

}



export function clearMailHistory(){

localStorage.removeItem(

MAILS_KEY

);

}



export function replacePlaceholders(

message,

user

){

if(!user){

return message;

}

let text=message;

text=text.replaceAll(

"{name}",

user.name||""

);

text=text.replaceAll(

"{username}",

user.username||""

);

text=text.replaceAll(

"{email}",

user.email||""

);

text=text.replaceAll(

"{phone}",

user.phone||""

);

text=text.replaceAll(

"{role}",

user.role||"user"

);

text=text.replaceAll(

"{createdAt}",

user.createdAt||""

);

text=text.replaceAll(

"{lastLogin}",

user.lastLogin||"Never"

);

return text;

}



export function generateId(){

return Date.now()+Math.floor(

Math.random()*100000

);

}