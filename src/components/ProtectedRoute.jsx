import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const ProtectedRoute = () => {
    const { usercred } = useContext(AuthContext)
    // 1. If there is NO user logged in, redirect them straight to the Login page
    if (!usercred)
        // 'replace' prevents the user from hitting the "back" button to return here
        return <Navigate to="/" replace />;
    // 2. If they are logged in, render the requested page component normally
    return <DashboardLayout />;
}

export default ProtectedRoute
