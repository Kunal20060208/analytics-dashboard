import {
createContext,
useState
} from "react";

export const SearchContext=createContext();

export function SearchProvider({children}){

const[
search,
setSearchState
]=useState("");

function setSearch(value){

setSearchState(value.trimStart());

}

function clearSearch(){

setSearchState("");

}

return(

<SearchContext.Provider
value={{
search,
setSearch,
clearSearch
}}
>

{children}

</SearchContext.Provider>

);

}