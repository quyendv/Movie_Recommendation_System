import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import favoriteApi from '~/apis/favorite.api';
import userApi from '~/apis/user.api';
import { setFavoriteList, setUser } from '~/redux/features/userSlice';
import GlobalLoading from '../common/GlobalLoading';
import Header from '../common/Header';

function MainLayout({ children }) {
  // @ts-ignore
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // GetInfo when run app
  useEffect(() => {
    const getUserInfo = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response.data)); // .data by server not axios
      if (err) dispatch(setUser(null));
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const getFavoriteList = async () => {
      const { response, err } = await favoriteApi.getList();

      if (response) dispatch(setFavoriteList(response.data));
      if (err) {
      } // TODO: toast
    };

    if (user) getFavoriteList();
    if (!user) dispatch(setFavoriteList([]));
  }, [user]); // update following user

  return (
    <>
      {/* Global Loading */}
      <GlobalLoading />

      {/* Layout */}
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Header />

        {/* MainPage ~ MainContent */}
        <main className="flex-1 overflow-hidden">{children}</main>

        {/* Footer */}
      </div>
    </>
  );
}

export default MainLayout;
