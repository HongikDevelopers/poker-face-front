import Home from './Home';
import Game from './Game';
import NotFound from './NotFound';

import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

export const enum RoutePath {
  home = '/',
  sevenCardStud = '/seven-card-stud',
  mineClicker = '/mine-clicker',
}

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path={RoutePath.home} element={<Home />} />
      <Route
        path={RoutePath.sevenCardStud}
        element={<Game game="seven-card-stud" />}
      />
      <Route
        path={RoutePath.mineClicker}
        element={<Game game="mine-clicker" />}
      />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
