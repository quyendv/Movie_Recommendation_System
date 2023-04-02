import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from '~/routes';
import MainLayout from './components/layouts/MainLayout';

function App() {
  return (
    <div className='dark'>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Layout = route.layout ? route.layout : MainLayout;
            return route.index ? (
              <Route index key={index} element={<Layout>{route.element}</Layout>} />
            ) : (
              <Route path={route.path} element={<Layout>{route.element}</Layout>} />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
