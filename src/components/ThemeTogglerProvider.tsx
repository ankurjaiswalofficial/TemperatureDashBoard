"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ThemeTogglerButton() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button onClick={toggleTheme} variant={"outline"} className="absolute top-0.5 right-0.5">
            {theme === "light" ? "🌜" : "🌞"}
        </Button>
    );
}
