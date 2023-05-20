// @ts-nocheck
import HeadlessTippy from '@tippyjs/react/headless';
import { useRef } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userMenu } from '~/configs/menu.config';
import { setUser } from '~/redux/features/userSlice';

function UserMenu() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const tippyRef = useRef();

  return (
    <>
      <HeadlessTippy
        delay={[50, 50]}
        offset={[0, 16]}
        // visible
        // trigger="click"
        interactive
        placement="bottom-end"
        appendTo={'parent'} // document.body must set theme value for body (not App component)
        ref={tippyRef}
        render={(attrs) => (
          // wrapper: no css
          <div tabIndex={-1} {...attrs}>
            {/* Arrow custom */}
            <span id="arrow" data-popper-arrow="" />
            {/* Container */}
            <nav className="relative min-w-[200px] rounded bg-skin-paper py-2 font-roboto text-skin-contrast shadow-md">
              {/* List userMenu */}
              {userMenu.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className="flex items-center gap-5 px-3 py-1.5 font-semibold uppercase tracking-wide hover:bg-skin-navHover"
                  onClick={() => tippyRef?.current?._tippy?.hide()}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}

              <button
                className="flex w-full items-center gap-5 px-3 py-1.5 font-semibold uppercase tracking-wide hover:bg-skin-navHover"
                onClick={() => {
                  dispatch(setUser(null));
                  tippyRef?.current?._tippy?.hide();
                }}
              >
                <span>
                  <FaSignOutAlt size={24} />
                </span>
                <span>Sign out</span>
              </button>
            </nav>
          </div>
        )}
      >
        <div className="group ml-auto hidden cursor-pointer select-none items-center overflow-hidden rounded-full bg-blue-200 p-1 md:flex">
          <div className="grid h-10 w-10 place-content-center rounded-full bg-skin-primary font-berkshireSwash text-xl font-semibold text-white">
            {user?.displayName?.charAt(0)?.toUpperCase()}
          </div>
          <span className="mx-0 max-h-10 w-0 overflow-hidden font-medium text-black duration-500 ease-out group-hover:mx-1 group-hover:w-fit">
            {user?.displayName}
          </span>
        </div>
      </HeadlessTippy>
    </>
  );
}

export default UserMenu;
