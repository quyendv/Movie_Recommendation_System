import { Link } from 'react-router-dom';
import routesConfigs from '~/configs/routes';

function Logo() {
  return (
    <Link to={routesConfigs.home} className="text-3xl font-bold tracking-wider">
      <span className="text-skin-contrast">Q</span>
      <span className="text-skin-primary">Flix</span>
    </Link>
  );
}

export default Logo;
