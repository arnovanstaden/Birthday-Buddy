import { createContext, useState, useEffect } from "react";
import { auth, analytics } from "../config/firebase";
import { createDbUser } from "../utils/user";
import { storeFCMRegToken, deleteFCMRegToken } from "../utils/reminders";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // Config

    // State
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUsername = () => {
        return currentUser.displayName
    }

    const signUp = async (authData) => {
        const newUser = await auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                const user = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: authData.displayName
                }
                auth.currentUser.updateProfile({
                    displayName: user.displayName
                })
                return user
            })
            .catch((error) => {
                throw error
            });
        await createDbUser(newUser)
        storeFCMRegToken()
        analytics.logEvent("sign_up")
        return newUser
    }

    const signIn = async (authData) => {
        const authResult = await auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                return result.user
            })
            .catch((error) => {
                console.log(error)
                throw error
            });
        storeFCMRegToken()
        analytics.logEvent("login")
        return authResult
    };

    const signOut = async () => {
        await deleteFCMRegToken()
        return await auth.signOut()
    };

    const resetPassword = async (email) => {
        return await auth.sendPasswordResetEmail(email)
    }

    // Set user on Auth Change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, []);

    // Set Cookies for SSR
    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                setCurrentUser(null);
            } else {
                setCurrentUser(user);
            }
        });
    }, []);

    // Context Value
    const value = {
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword,
        getUsername
    }

    return (
        <UserContext.Provider
            value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}