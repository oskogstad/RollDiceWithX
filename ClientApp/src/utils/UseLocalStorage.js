import { useState, useEffect } from "react";

const GetStoredValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    const initialValue = JSON.parse(storedValue);
    
    return initialValue || defaultValue;
}

export const UseLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return GetStoredValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};