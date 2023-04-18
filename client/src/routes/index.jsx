import ProtectedLayout from '~/components/layouts/ProtectedLayout';
import { routesConfigs } from '~/configs/routes.configs';
import Favorites from '~/pages/Favorites';
import HomePage from '~/pages/Home';
import MediaDetail from '~/pages/MediaDetail';
import MediaList from '~/pages/MediaList';
import PersonDetail from '~/pages/PersonDetail';
import Search from '~/pages/Search';
import Signin from '~/pages/Signin';
import Signup from '~/pages/Signup';

const routes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: routesConfigs.favorites,
    element: (
      <ProtectedLayout>
        <Favorites />
      </ProtectedLayout>
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
  },
  {
    path: routesConfigs.signup,
    element: <Signup />,
  },
];

export default routes;
