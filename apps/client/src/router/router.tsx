import { createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router';
import { ErrorBoundary } from '../app/wrappers/error-boundary/error-boundary.tsx';
import { appRoutes } from './routes/app.routes.tsx';
import { rootRoutes } from './routes/root.routes.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorBoundary />,
    children: [rootRoutes, appRoutes],
  },
]);
