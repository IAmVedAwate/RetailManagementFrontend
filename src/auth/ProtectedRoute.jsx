import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children, allowedRoles, alreadyUser }) => {
    const { userInfo } = useUser();

    if (!userInfo) {
        return <Navigate to="/register" />; 
    }
    if(alreadyUser && userInfo) {
        return <Navigate to="/" />; 
    }

    if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
        
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;
