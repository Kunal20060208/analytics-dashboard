import {
useContext
} from "react";

import {
LanguageContext
} from "../context/LanguageContext";

import {
SettingsContext
} from "../context/SettingsContext";

function Settings(){

const{
language,
changeLanguage
}=useContext(LanguageContext);

const{
notifications,
setNotifications,
compact,
setCompact
}=useContext(SettingsContext);

return(

<div
className="
min-h-screen
p-8
bg-slate-100
dark:bg-slate-950
text-slate-900
dark:text-white
transition-colors
duration-300
"
>

<h1
className="
text-4xl
font-bold
mb-8
"
>

Settings ⚙️

</h1>

<div
className="
max-w-xl
bg-white
dark:bg-slate-900
rounded-3xl
p-8
shadow-xl
space-y-8
"
>

<div>

<h2 className="font-bold mb-2">

Language

</h2>

<select

value={language}

onChange={e=>changeLanguage(e.target.value)}

className="
w-full
p-3
rounded-xl
bg-slate-100
dark:bg-slate-800
dark:text-white
"

>

<option value="English">

English

</option>

<option value="Hindi">

हिन्दी

</option>

</select>

</div>

<div
className="
flex
justify-between
items-center
"
>

<div>

<h2 className="font-bold">

Notifications

</h2>

<p className="text-sm opacity-70">

Enable email & dashboard alerts

</p>

</div>

<input

type="checkbox"

checked={notifications}

onChange={e=>setNotifications(e.target.checked)}

/>

</div>

<div
className="
flex
justify-between
items-center
"
>

<div>

<h2 className="font-bold">

Compact Dashboard

</h2>

<p className="text-sm opacity-70">

Reduce spacing between dashboard sections

</p>

</div>

<input

type="checkbox"

checked={compact}

onChange={e=>setCompact(e.target.checked)}

/>

</div>

</div>

</div>

);

}

export default Settings;