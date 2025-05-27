import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchContextProvider = ({children}) =>{
        const [searchText, setSearchText] = useState("");
    return (
        <SearchContext.Provider value={{searchText, setSearchText}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () =>useContext(SearchContext)