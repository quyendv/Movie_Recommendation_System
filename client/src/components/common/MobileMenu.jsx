import { memo, useState } from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { navMenu } from '~/configs/menu.config';
import { themeModes } from '~/configs/theme.configs';
import Logo from './Logo';

function MobileMenu({ theme, onSwitchTheme }) {
  const [active, setActive] = useState(false);
  const handleToggleActive = () => setActive(!active);
  const handleCloseActive = () => setActive(false);

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

        {/* Menu */}
        <div className="mt-8 p-2">
          <h2 className="mb-5 text-2xl font-bold uppercase text-skin-contrast">Menu</h2>
          <nav className="flex flex-col gap-3 font-medium uppercase tracking-wide text-skin-contrast">
            {navMenu.map((nav, index) => (
              <NavLink
                key={index}
                className={({ isActive }) =>
                  `flex items-center gap-5 rounded px-4 py-3 text-xl ${
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

        {/* Theme switcher */}
        <div className="mt-8 p-2">
          <h2 className="mb-5 text-2xl font-bold uppercase text-skin-contrast">Theme</h2>
          <button className="flex items-center gap-4 p-3 text-xl text-skin-contrast" onClick={onSwitchTheme}>
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
  );
}

export default memo(MobileMenu);
