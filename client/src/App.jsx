import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from '~/routes';
import MainLayout from './components/layouts/MainLayout';

function App() {
  // @ts-ignore
  const { theme } = useSelector((state) => state.theme);

  return (
    // AppWrapper: set bg-default + min-h-screen here or set bg-default for body
    <div className={theme + ' min-h-screen min-w-full bg-skin-default'}>
      {/* App Router */}
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Layout = route.layout ? route.layout : MainLayout;
            return route.index ? (
              <Route index key={index} element={<Layout>{route.element}</Layout>} />
            ) : (
              <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>} />
            );
          })}
          {/* // TODO: Page Not Found */}
        </Routes>
      </Router>

      {/* // TODO: Toastify */}
    </div>
  );
}

export default App;
