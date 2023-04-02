import { NavLink } from 'react-router-dom';
import routesConfigs from '~/configs/routes';
import Logo from './Logo';

function Header() {
  return (
    // Wrapper
    <div className="flex h-header w-full items-center justify-between bg-skin-default px-6">
      {/* Menu mobile: //TODO Hamburger */}

      {/* Logo */}
      <Logo />

      {/* Navigation: //TODO: refactor to a Component */}
      <nav className="flex flex-row gap-3 font-medium uppercase text-skin-contrast">
        <NavLink
          className={({ isActive }) => `rounded px-2 py-1.5 ${isActive ? 'bg-skin-secondary' : ''}`}
          to={routesConfigs.home}
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => `rounded px-2 py-1.5 ${isActive ? 'bg-skin-secondary' : ''}`}
          to={routesConfigs.movie}
          end
        >
          Movies
        </NavLink>
        <NavLink
          className={({ isActive }) => `rounded px-2 py-1.5 ${isActive ? 'bg-skin-secondary' : ''}`}
          to={routesConfigs.tv}
          end
        >
          TV Shows
        </NavLink>
        <NavLink
          className={({ isActive }) => `rounded px-2 py-1.5 ${isActive ? 'bg-skin-secondary' : ''}`}
          to={routesConfigs.search}
          end
        >
          Search
        </NavLink>
      </nav>

      {/* User menu //TODO Dropdown */}
    </div>
  );
}

export default Header;
