import { useEffect, useState } from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import routesConfigs from '~/configs/routes';
import { themeModes } from '~/constants/theme';
import { setTheme } from '~/redux/features/themeSlice';
import Logo from './Logo';

function Header() {
  // @ts-ignore
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [headerBg, setHeaderBg] = useState(theme === themeModes.dark ? 'bg-transparent' : 'bg-skin-default');

  useEffect(() => {
    const onWindowScroll = () => {
      const bg =
        window.scrollY > 50 && theme === themeModes.dark
          ? 'bg-skin-default'
          : theme === themeModes.dark
          ? 'bg-transparent'
          : 'bg-skin-default';
      setHeaderBg(bg);
    };
    window.addEventListener('scroll', onWindowScroll);

    return () => window.removeEventListener('scroll', onWindowScroll);
  }, []);

  return (
    // Wrapper
    <header className={`fixed left-0 top-0 z-10 flex h-header w-full items-center px-6 ${headerBg}`}>
      {/* Menu mobile: //TODO Hamburger */}

      {/* Logo */}
      <Logo />

      {/* Navigation: //TODO: refactor to a Component */}
      <nav className="ml-10 flex flex-row gap-3 font-medium uppercase tracking-wide text-skin-contrast">
        <NavLink
          className={({ isActive }) => `rounded px-2 py-1.5 ${isActive ? 'bg-skin-secondary text-white' : ''}`}
          to={routesConfigs.home}
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => `rounded px-2 py-1.5 ${isActive ? 'bg-skin-secondary text-white' : ''}`}
          to={routesConfigs.movie}
          end
        >
          Movies
        </NavLink>
        <NavLink
          className={({ isActive }) => `rounded px-2 py-1.5 ${isActive ? 'bg-skin-secondary text-white' : ''}`}
          to={routesConfigs.tv}
          end
        >
          TV Series
        </NavLink>
        <NavLink
          className={({ isActive }) => `rounded px-2 py-1.5 ${isActive ? 'bg-skin-secondary text-white' : ''}`}
          to={routesConfigs.search}
          end
        >
          Search
        </NavLink>
      </nav>

      {/* Theme switcher */}
      <button
        className="rounded-full p-3 text-lg text-skin-contrast hover:bg-[rgba(255,255,255,0.1)]"
        onClick={() => {
          dispatch(setTheme(theme === themeModes.dark ? themeModes.light : themeModes.dark));
        }}
      >
        {theme === themeModes.light && <BsFillSunFill size={20} />}
        {theme === themeModes.dark && <BsFillMoonStarsFill />}
      </button>

      {/* User menu //TODO Dropdown */}
    </header>
  );
}

export default Header;
