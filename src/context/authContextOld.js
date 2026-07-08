import { createContext, useState } from "react"

//1. initialize context and export
export const AuthContext = createContext()

//.2 create provider and export
// Provider must accept {children} props
// define global state in provider whichever you want to access through out application
export const AuthProvider = ({children}) =>{
const [user,setUser] = useState(null)

return <AuthContext.Provider value={{user}}>
    {children}
</AuthContext.Provider>
}
