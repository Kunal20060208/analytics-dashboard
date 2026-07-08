import {
getUsers,
getMails
} from "./storage";

export function getStatistics(){

const users=getUsers();

const mails=getMails();

const totalUsers=users.length;

const activeUsers=users.filter(
user=>!user.banned
).length;

const bannedUsers=users.filter(
user=>user.banned
).length;

const adminUsers=users.filter(
user=>user.role==="admin"
).length;

const normalUsers=users.filter(
user=>user.role==="user"
).length;

const totalMails=mails.length;

const readMails=mails.filter(
mail=>mail.read
).length;

const unreadMails=mails.filter(
mail=>!mail.read
).length;

const sentMails=mails.filter(
mail=>mail.status==="Sent"
).length;

const failedMails=mails.filter(
mail=>mail.status==="Failed"
).length;

return{

totalUsers,

activeUsers,

bannedUsers,

adminUsers,

normalUsers,

totalMails,

readMails,

unreadMails,

sentMails,

failedMails,

systemHealth:"100%",

database:"Local Storage"

};

}

export function getRecentUsers(limit=5){

const users=getUsers();

return [...users]

.sort(
(a,b)=>

new Date(b.createdAt)-new Date(a.createdAt)

)

.slice(0,limit);

}

export function getRecentMails(limit=10){

const mails=getMails();

return [...mails]

.sort(
(a,b)=>

b.id-a.id

)

.slice(0,limit);

}

export function getUserGrowth(){

const users=getUsers();

const growth={};

users.forEach(user=>{

const date=user.createdAt.split(",")[0];

if(!growth[date]){

growth[date]=0;

}

growth[date]++;

});

return Object.entries(growth).map(

([date,count])=>({

date,

count

})

);

}

export function getMailGrowth(){

const mails=getMails();

const growth={};

mails.forEach(mail=>{

const date=mail.time.split(",")[0];

if(!growth[date]){

growth[date]=0;

}

growth[date]++;

});

return Object.entries(growth).map(

([date,count])=>({

date,

count

})

);

}

export function getTopMailReceivers(limit=5){

const mails=getMails();

const stats={};

mails.forEach(mail=>{

if(!stats[mail.to]){

stats[mail.to]=0;

}

stats[mail.to]++;

});

return Object.entries(stats)

.map(

([email,count])=>({

email,

count

})

)

.sort(
(a,b)=>b.count-a.count
)

.slice(0,limit);

}

export function getSystemActivity(){

const stats=getStatistics();

return[

{

title:"Registered Users",

value:stats.totalUsers,

color:"blue"

},

{

title:"Admins",

value:stats.adminUsers,

color:"purple"

},

{

title:"Normal Users",

value:stats.normalUsers,

color:"green"

},

{

title:"Banned Users",

value:stats.bannedUsers,

color:"red"

},

{

title:"Emails Sent",

value:stats.sentMails,

color:"indigo"

},

{

title:"Failed Emails",

value:stats.failedMails,

color:"orange"

},

{

title:"Unread Emails",

value:stats.unreadMails,

color:"yellow"

},

{

title:"Read Emails",

value:stats.readMails,

color:"emerald"

}

];

}