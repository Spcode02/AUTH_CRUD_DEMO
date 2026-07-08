import { createContext, useState } from "react";
export const AuthContext = createContext()

export function AuthProvider({children}) {
    const [userCred, setUserCred] = useState( () => {
        const savedUser = JSON.parse(localStorage.getItem('userData'));
        console.log(savedUser);
        // if(savedUser) {
        //     setUserCred(savedUser)
        // }else{
        //     setUserCred(null)
        // }
        return savedUser ? savedUser : null;
    })

    console.log(userCred);

    const logout = () =>{
         localStorage.removeItem('userData')
         setUserCred(null)
    }

return <AuthContext.Provider value={{userCred, setUserCred, logout}}>
    {children}
</AuthContext.Provider>
}
