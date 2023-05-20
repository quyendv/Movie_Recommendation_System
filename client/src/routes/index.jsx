import { Fragment } from 'react';
import ProtectedPage from '~/components/common/ProtectedPage';
import AuthLayout from '~/components/layouts/AuthLayout';
import { routesConfigs } from '~/configs/routes.configs';
import Comments from '~/pages/Comments';
import Favorites from '~/pages/Favorites';
import HomePage from '~/pages/Home';
import MediaDetail from '~/pages/MediaDetail';
import MediaList from '~/pages/MediaList';
import NotFound from '~/pages/NotFound';
import PersonDetail from '~/pages/PersonDetail';
import Search from '~/pages/Search';
import Signin from '~/pages/Signin';
import Signup from '~/pages/Signup';
import UpdatePassword from '~/pages/UpdatePassword';

const routes = [
  {
    index: true,
    // path: routesConfigs.home,
    element: <HomePage />,
  },
  {
    path: routesConfigs.favorites,
    element: (
      <ProtectedPage>
        <Favorites />
      </ProtectedPage>
    ),
  },
  {
    path: routesConfigs.comments,
    element: (
      <ProtectedPage>
        <Comments />
      </ProtectedPage>
    ),
  },
  {
    path: routesConfigs.personDetail,
    element: <PersonDetail />,
  },
  {
    path: routesConfigs.mediaList,
    element: <MediaList />,
  },
  {
    path: routesConfigs.mediaDetail,
    element: <MediaDetail />,
  },
  {
    path: routesConfigs.search,
    element: <Search />,
  },
  {
    path: routesConfigs.signin,
    element: <Signin />,
    layout: AuthLayout,
  },
  {
    path: routesConfigs.signup,
    element: <Signup />,
    layout: AuthLayout,
  },
  {
    path: routesConfigs.updatePassword,
    element: (
      <ProtectedPage>
        <UpdatePassword />
      </ProtectedPage>
    ),
    layout: AuthLayout,
  },
  {
    path: routesConfigs.notfound,
    element: <NotFound />,
    layout: Fragment,
  },
];

export default routes;
