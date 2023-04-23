import { Link } from 'react-router-dom';
import { routesConfigs } from '~/configs/routes.configs';

function Logo({ className = '' }) {
  return (
    <Link to={routesConfigs.home} className={`text-3xl font-bold tracking-wider ${className}`}>
      <span className="text-skin-contrast">Q</span>
      <span className="text-skin-primary">Flix</span>
    </Link>
  );
}

export default Logo;
