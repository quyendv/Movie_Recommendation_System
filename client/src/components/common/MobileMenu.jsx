import { memo, useState } from 'react';
import { BiLogInCircle } from 'react-icons/bi';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { navMenu, userMenu } from '~/configs/menu.config';
import { routesConfigs } from '~/configs/routes.configs';
import { themeModes } from '~/configs/theme.configs';
import { setUser } from '~/redux/features/userSlice';
import Logo from './Logo';

function MobileMenu({ theme, onSwitchTheme }) {
  const [active, setActive] = useState(false);
  const handleToggleActive = () => setActive(!active);
  const handleCloseActive = () => setActive(false);

  // @ts-ignore
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className={`mobile-menu ${active ? 'active' : ''}`}>
      {/* Toggle Button */}
      <div className={`hamburger ${active ? 'active' : ''}`} onClick={handleToggleActive}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>

      {/* Overlay when active (z-[-1] to under Content & Toggle Button) -> click to close */}
      <div
        className={`absolute right-full top-0 z-[-1] h-screen w-screen bg-overlayToLeft ${active ? 'block' : 'hidden'}`}
        onClick={handleCloseActive}
      ></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-start bg-skin-sidebarMenu p-3">
        {/* Logo */}
        <Logo className="pointer-events-none text-center" />

        {/* Actions */}
        <div className="mt-4 space-y-2">
          {/* Menu */}
          <div className="p-2">
            <h2 className="mb-2 text-xl font-bold uppercase text-skin-contrast">Menu</h2>
            <nav className="flex flex-col font-medium uppercase tracking-wide text-skin-contrast">
              {navMenu.map((nav, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    `flex items-center gap-5 rounded px-4 py-2.5 ${
                      isActive ? 'bg-skin-primary text-white' : 'hover:bg-skin-navHover'
                    }`
                  }
                  to={nav.path}
                  end
                  onClick={handleCloseActive}
                >
                  <span className="min-w-max">{nav.icon}</span>
                  <span>{nav.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* UserDropdown */}
          <div className="p-2">
            <h2 className="mb-2 text-xl font-bold uppercase text-skin-contrast">{user?.displayName || 'Personal'}</h2>
            <nav className="flex flex-col font-medium uppercase tracking-wide text-skin-contrast">
              {user &&
                userMenu.map((item, index) => (
                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      `flex items-center gap-5 rounded px-4 py-2.5 ${
                        isActive ? 'bg-skin-primary text-white' : 'hover:bg-skin-navHover'
                      }`
                    }
                    to={item.path}
                    end
                    onClick={handleCloseActive}
                  >
                    <span className="min-w-max">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              {!user ? (
                <Link
                  className="flex w-full items-center gap-5 px-4 py-2.5 font-semibold uppercase tracking-wide hover:bg-skin-navHover"
                  to={routesConfigs.signin}
                >
                  <span>
                    <BiLogInCircle size={24} />
                  </span>
                  <span>Sign in</span>
                </Link>
              ) : (
                <button
                  className="flex w-full items-center gap-5 px-4 py-2.5 font-semibold uppercase tracking-wide hover:bg-skin-navHover"
                  onClick={() => {
                    dispatch(setUser(null));
                    setActive(false);
                  }}
                >
                  <span>
                    <FaSignOutAlt size={24} />
                  </span>
                  <span>Sign out</span>
                </button>
              )}
            </nav>
          </div>

          {/* Theme switcher */}
          <div className="p-2">
            <h2 className="mb-2 text-xl font-bold uppercase text-skin-contrast">Theme</h2>
            <button className="flex items-center gap-4 p-2.5 font-semibold text-skin-contrast" onClick={onSwitchTheme}>
              {theme === themeModes.light ? (
                <>
                  <BsFillSunFill size={20} />
                  <span className="uppercase">Light Mode</span>
                </>
              ) : (
                <>
                  <BsFillMoonStarsFill />
                  <span className="uppercase">Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(MobileMenu);
