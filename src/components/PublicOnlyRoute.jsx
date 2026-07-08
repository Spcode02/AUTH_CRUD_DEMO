import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const PublicOnlyRoute = ({ children }) => {
    const { userCred } = useContext(AuthContext)
    if (userCred)
        return (
            <Navigate to="/dashboard"></Navigate>
        )
    return children;
}

export default PublicOnlyRoute
