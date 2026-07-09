import {
createContext,
useEffect,
useState
} from "react";

export const SettingsContext=createContext();

function getBoolean(key,defaultValue){

try{

const value=localStorage.getItem(key);

return value===null
?defaultValue
:JSON.parse(value);

}

catch{

return defaultValue;

}

}

function getNumber(key,defaultValue){

const value=Number(localStorage.getItem(key));

if(

!Number.isFinite(value)
||
value<=0

){

return defaultValue;

}

return value;

}

export function SettingsProvider({children}){

const[
notifications,
setNotifications
]=useState(
()=>getBoolean("notifications",true)
);

const[
compact,
setCompact
]=useState(
()=>getBoolean("compact",false)
);

const[
animations,
setAnimations
]=useState(
()=>getBoolean("animations",true)
);

const[
rowsPerPage,
setRowsPerPage
]=useState(
()=>getNumber("rowsPerPage",10)
);

const[
autoSave,
setAutoSave
]=useState(
()=>getBoolean("autoSave",true)
);

useEffect(()=>{

localStorage.setItem(
"notifications",
JSON.stringify(notifications)
);

},[notifications]);

useEffect(()=>{

localStorage.setItem(
"compact",
JSON.stringify(compact)
);

},[compact]);

useEffect(()=>{

localStorage.setItem(
"animations",
JSON.stringify(animations)
);

},[animations]);

useEffect(()=>{

localStorage.setItem(
"rowsPerPage",
rowsPerPage.toString()
);

},[rowsPerPage]);

useEffect(()=>{

localStorage.setItem(
"autoSave",
JSON.stringify(autoSave)
);

},[autoSave]);

function resetSettings(){

setNotifications(true);
setCompact(false);
setAnimations(true);
setRowsPerPage(10);
setAutoSave(true);

localStorage.setItem(
"notifications",
JSON.stringify(true)
);

localStorage.setItem(
"compact",
JSON.stringify(false)
);

localStorage.setItem(
"animations",
JSON.stringify(true)
);

localStorage.setItem(
"rowsPerPage",
"10"
);

localStorage.setItem(
"autoSave",
JSON.stringify(true)
);

}

return(

<SettingsContext.Provider
value={{

notifications,
setNotifications,

compact,
setCompact,

animations,
setAnimations,

rowsPerPage,
setRowsPerPage,

autoSave,
setAutoSave,

resetSettings

}}
>

{children}

</SettingsContext.Provider>

);

}