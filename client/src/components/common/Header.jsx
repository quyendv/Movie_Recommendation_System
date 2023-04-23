import { useCallback, useEffect, useState } from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { navMenu } from '~/configs/menu.config';
import { themeModes } from '~/configs/theme.configs';
import { setTheme } from '~/redux/features/themeSlice';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

function Header() {
  // @ts-ignore
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [headerBg, setHeaderBg] = useState(theme === themeModes.dark ? 'bg-transparent' : 'bg-skin-paper');

  /**
   * useEffect Update Background:
   *  - scroll (forced to listen to the event again when themeState(redux) changes because the old listener is using the old theme's value and can't be updated -> add 'theme' dependence)
   *  - switch theme (Don't use in handleSwitchTheme function immediately after dispatch, because state has not been updated at that time but after the function is done)
   */
  useEffect(() => {
    window.addEventListener('scroll', handleUpdateBgColor);
    handleUpdateBgColor(); // optional: update state first time INSTEAD OF initial value's useState
    return () => window.removeEventListener('scroll', handleUpdateBgColor);
  }, [theme]); // must add 'theme' dependence, and only listenEvent again when switch theme

  const handleUpdateBgColor = () => {
    const bg = window.scrollY <= 50 && theme === themeModes.dark ? 'bg-transparent' : 'bg-skin-paper';
    // console.log(window.scrollY, bg, headerBg, bg !== headerBg, theme); // check
    setHeaderBg(bg); // setState auto only update & re-render if oldState !== newState
  };

  const handleSwitchTheme = useCallback(() => {
    dispatch(setTheme(theme === themeModes.dark ? themeModes.light : themeModes.dark));
    // use useEffect instead of calling handleUpdateBgColor fn here, due to state isn't updated immediately
  }, [theme]);

  return (
    <>
      <header className={`fixed left-0 top-0 z-20 flex h-header w-full items-center px-6 ${headerBg}`}>
        {/* Menu mobile: //TODO Hamburger */}
        <MobileMenu theme={theme} onSwitchTheme={handleSwitchTheme} />

        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="ml-10 hidden flex-row gap-3 font-medium uppercase tracking-wide text-skin-contrast md:flex">
          {navMenu.map((nav, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `rounded px-2 py-1.5 ${isActive ? 'bg-skin-primary text-white' : 'hover:bg-skin-navHover'}`
              }
              to={nav.path}
              end
            >
              {nav.name}
            </NavLink>
          ))}
        </nav>

        {/* Theme switcher */}
        <button
          className="ml-4 hidden rounded-full p-3 text-lg text-skin-contrast hover:bg-skin-navHover md:block"
          onClick={handleSwitchTheme}
        >
          {theme === themeModes.light && <BsFillSunFill size={20} />}
          {theme === themeModes.dark && <BsFillMoonStarsFill />}
        </button>

        {/* User menu //TODO Dropdown */}
      </header>
    </>
  );
}

export default Header;
