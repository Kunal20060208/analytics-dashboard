import {
createContext,
useEffect,
useState
} from "react";

export const LanguageContext=createContext();

const translations={

English:{

dashboard:"Dashboard Overview 🚀",

track:"Track business performance and analytics.",

search:"Search analytics...",

profile:"Profile",

settings:"Settings",

users:"Users",

analytics:"Analytics",

logout:"Logout",

language:"Language",

notifications:"Notifications",

compact:"Compact Dashboard",

animations:"Animations",

rows:"Rows Per Table",

autosave:"Auto Save",

save:"Save",

cancel:"Cancel",

edit:"Edit Profile",

login:"Login",

register:"Register",

name:"Full Name",

username:"Username",

email:"Email Address",

phone:"Phone Number",

password:"Password",

confirmPassword:"Confirm Password",

welcome:"Welcome Back 👋",

createAccount:"Create Account 🚀",

viewProfile:"View Profile"

},



Hindi:{

dashboard:"डैशबोर्ड 🚀",

track:"व्यवसाय के प्रदर्शन और विश्लेषण को ट्रैक करें।",

search:"एनालिटिक्स खोजें...",

profile:"प्रोफ़ाइल",

settings:"सेटिंग्स",

users:"उपयोगकर्ता",

analytics:"एनालिटिक्स",

logout:"लॉगआउट",

language:"भाषा",

notifications:"सूचनाएँ",

compact:"कॉम्पैक्ट डैशबोर्ड",

animations:"एनीमेशन",

rows:"प्रति तालिका पंक्तियाँ",

autosave:"ऑटो सेव",

save:"सहेजें",

cancel:"रद्द करें",

edit:"प्रोफ़ाइल संपादित करें",

login:"लॉगिन",

register:"रजिस्टर",

name:"पूरा नाम",

username:"यूज़रनेम",

email:"ईमेल पता",

phone:"मोबाइल नंबर",

password:"पासवर्ड",

confirmPassword:"पासवर्ड की पुष्टि करें",

welcome:"वापसी पर स्वागत है 👋",

createAccount:"खाता बनाएँ 🚀",

viewProfile:"प्रोफ़ाइल देखें"

}

};



export function LanguageProvider({children}){

const [language,setLanguage]=useState(

localStorage.getItem("language") || "English"

);



useEffect(()=>{

localStorage.setItem(

"language",

language

);

},[language]);



function changeLanguage(lang){

setLanguage(lang);

}



return(

<LanguageContext.Provider

value={{

language,

changeLanguage,

t:translations[language]

}}

>

{children}

</LanguageContext.Provider>

);

}