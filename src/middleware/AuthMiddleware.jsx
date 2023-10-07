// AuthMiddleware.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function AuthMiddleware({ children }) {
  const { user } = useAuth();

  if (user) {
    // Navigate to the home page if the user is logged in
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default AuthMiddleware;
