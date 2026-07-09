import React, {StrictMode, useEffect} from "react";
import ReactDOM from "react-dom/client";
import {
BrowserRouter
} from "react-router-dom";

import "./index.css";

import App from "./App";

import {
AuthProvider
} from "./context/AuthContext";

import {
ThemeProvider
} from "./context/ThemeContext";

import {
LanguageProvider
} from "./context/LanguageContext";

import {
SettingsProvider
} from "./context/SettingsContext";

import {
SearchProvider
} from "./context/SearchContext";

import ErrorBoundary from "./components/ErrorBoundary";
import NetworkError from "./components/NetworkError";
import "./utils/errorHandler";

function AppWrapper() {

    useEffect(()=>{

const disableContextMenu=(e)=>{

e.preventDefault();

};

const disableKeys=(e)=>{

/* F12 */

if(e.key==="F12"){

e.preventDefault();

}

/* Ctrl+Shift+I */

if(

e.ctrlKey
&&
e.shiftKey
&&
e.key.toUpperCase()==="I"

){

e.preventDefault();

}

/* Ctrl+Shift+J */

if(

e.ctrlKey
&&
e.shiftKey
&&
e.key.toUpperCase()==="J"

){

e.preventDefault();

}

/* Ctrl+Shift+C */

if(

e.ctrlKey
&&
e.shiftKey
&&
e.key.toUpperCase()==="C"

){

e.preventDefault();

}

/* Ctrl+U */

if(

e.ctrlKey
&&
e.key.toUpperCase()==="U"

){

e.preventDefault();

}

};

document.addEventListener(

"contextmenu",

disableContextMenu

);

document.addEventListener(

"keydown",

disableKeys

);

return()=>{

document.removeEventListener(

"contextmenu",

disableContextMenu

);

document.removeEventListener(

"keydown",

disableKeys

);

};

},[]);

    return <App />;

}

ReactDOM.createRoot(

document.getElementById("root")

).render(

<React.StrictMode>

<ErrorBoundary>

<AuthProvider>

<ThemeProvider>

<LanguageProvider>

<SettingsProvider>

<SearchProvider>

<BrowserRouter>

<NetworkError>

<AppWrapper />

</NetworkError>

</BrowserRouter>

</SearchProvider>

</SettingsProvider>

</LanguageProvider>

</ThemeProvider>

</AuthProvider>

</ErrorBoundary>

</React.StrictMode>

);