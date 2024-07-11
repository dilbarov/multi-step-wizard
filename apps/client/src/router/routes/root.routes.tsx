import { Navigate, RouteObject } from 'react-router';

export const rootRoutes: RouteObject = {
  path: '/',
  element: <Navigate replace to={'home'} />,
};
