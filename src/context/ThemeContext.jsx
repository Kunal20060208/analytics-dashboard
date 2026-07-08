import {
    createContext,
    useEffect,
    useState
} from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {

        const root = document.documentElement;

        if (dark) {

            root.classList.add("dark");

            document.body.style.backgroundColor = "#020617";
            document.body.style.color = "#ffffff";

            localStorage.setItem(
                "theme",
                "dark"
            );

        }
        else {

            root.classList.remove("dark");

            document.body.style.backgroundColor = "#f8fafc";
            document.body.style.color = "#0f172a";

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }, [dark]);

    function toggleTheme() {

        setDark(previous => !previous);

    }

    return (

        <ThemeContext.Provider

            value={{
                dark,
                setDark,
                toggleTheme
            }}

        >

            {children}

        </ThemeContext.Provider>

    );

}