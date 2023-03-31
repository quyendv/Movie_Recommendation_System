import { Navigate } from 'react-router-dom';
import routesConfigs from '~/configs/routes';

function ProtectedLayout({ children }) {
  const user = null;
  return user ? <>{children}</> : <Navigate to={routesConfigs.signin} />;
}

export default ProtectedLayout;
