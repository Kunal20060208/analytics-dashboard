import{

getUsers,

getMails,

saveMails,

replacePlaceholders,

generateId

}from "./storage";

const API_URL=

window.location.hostname==="localhost"

?

"http://localhost:5000"

:

"";

export async function sendMail(

target,

subject,

message

){

if(!target){

return{

success:false,

message:"Target user not found."

};

}

const finalMessage=

replacePlaceholders(

message,

target

);

let status="Failed";

let responseData={};

try{

const response=

await fetch(

`${API_URL}/api/send-mail`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

to:target.email,

subject,

message:finalMessage

})

}

);

responseData=

await response.json();

status=

response.ok&&responseData.success

?

"Sent"

:

"Failed";

}

catch(error){

console.error(error);

responseData={

success:false,

message:"Mail server unavailable."

};

status="Failed";

}

const mails=getMails();

const mail={

id:generateId(),

to:target.email,

username:target.username,

name:target.name,

subject,

message:finalMessage,

status,

read:false,

time:new Date().toLocaleString()

};

mails.unshift(mail);

saveMails(mails);

return{

...responseData,

mail

};

}

export async function sendMailToUser(

id,

subject,

message

){

const users=getUsers();

const target=

users.find(

user=>user.id===id

);

if(!target){

return{

success:false,

message:"User not found."

};

}

return await sendMail(

target,

subject,

message

);

}

export async function broadcastMail(

subject,

message

){

const users=getUsers();

const results=[];

for(const user of users){

const result=

await sendMail(

user,

subject,

message

);

results.push(result);

}

return{

success:true,

results

};

}

export function getMailHistory(){

return getMails();

}

export function markMailRead(id){

let mails=getMails();

mails=mails.map(mail=>

mail.id===id

?

{

...mail,

read:true

}

:

mail

);

saveMails(mails);

return{

success:true

};

}

export function deleteMail(id){

let mails=getMails();

mails=

mails.filter(

mail=>mail.id!==id

);

saveMails(mails);

return{

success:true

};

}

export function clearMailHistory(){

saveMails([]);

return{

success:true

};

}

export function searchMails(search){

const mails=getMails();

const text=

search.toLowerCase();

return mails.filter(mail=>

mail.to.toLowerCase().includes(text)

||

mail.username.toLowerCase().includes(text)

||

mail.subject.toLowerCase().includes(text)

||

mail.message.toLowerCase().includes(text)

);

}

export function getUnreadCount(){

return getMails().filter(

mail=>!mail.read

).length;

}

export function getMailStatistics(){

const mails=getMails();

return{

total:mails.length,

sent:mails.filter(

m=>m.status==="Sent"

).length,

failed:mails.filter(

m=>m.status==="Failed"

).length,

read:mails.filter(

m=>m.read

).length,

unread:mails.filter(

m=>!m.read

).length

};

}

export async function resendMail(id){

const mails=getMails();

const mail=

mails.find(

m=>m.id===id

);

if(!mail){

return{

success:false,

message:"Mail not found."

};

}

const users=getUsers();

const target=

users.find(

u=>u.email===mail.to

);

if(!target){

return{

success:false,

message:"User not found."

};

}

return await sendMail(

target,

mail.subject,

mail.message

);

}