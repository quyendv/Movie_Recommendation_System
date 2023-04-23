import { AiOutlineHome } from 'react-icons/ai';
import { BiSlideshow } from 'react-icons/bi';
import { MdSavedSearch, MdSlideshow } from 'react-icons/md';
import { routesConfigs } from './routes.configs';

export const navMenu = [
  {
    name: 'Home',
    path: routesConfigs.home,
    icon: <AiOutlineHome size={24} />,
  },
  {
    name: 'Movies',
    path: routesConfigs.movie,
    icon: <MdSlideshow size={24} />,
  },
  {
    name: 'TV series',
    path: routesConfigs.tv,
    icon: <BiSlideshow size={24} />, // || <MdLiveTv />
  },
  {
    name: 'Search',
    path: routesConfigs.search,
    icon: <MdSavedSearch size={24} />,
  },
];
