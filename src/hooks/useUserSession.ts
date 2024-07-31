import { useState, useEffect, useCallback } from 'react';

const useUserSession = () => {
    const [userInSession, setUserInSession] = useState<{ id: number } | null>(null);

    useEffect(() => {
        const handleStorageChange = () => {
            const user = sessionStorage.getItem('user');
            setUserInSession(user ? JSON.parse(user) : null);
        };

        // Initial check
        handleStorageChange();

        // Event listener for storage changes
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const addUserSession = useCallback((user: { id: number }) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        setUserInSession(user);
        window.dispatchEvent(new Event('storage')); // Notify other tabs
    }, []);

    const removeUserSession = useCallback(() => {
        sessionStorage.removeItem('user');
        setUserInSession(null);
        window.dispatchEvent(new Event('storage')); // Notify other tabs
    }, []);

    return { userInSession, addUserSession, removeUserSession };
};

export default useUserSession;
