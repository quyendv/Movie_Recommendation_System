import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import userApi from '~/apis/user.api';
import { setUser } from '~/redux/features/userSlice';
import GlobalLoading from '../common/GlobalLoading';
import Header from '../common/Header';

function MainLayout({ children }) {
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

  // TODO: Handle favorite

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
