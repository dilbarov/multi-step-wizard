import { RouteObject } from 'react-router';
import { AppLayout } from '../../app/layouts/app.layout.tsx';
import { HomePage } from '../../app/entities/home/pages/home.page.tsx';
import { QuestionnairePage } from '../../app/entities/questionnaire/pages/questionnaire-page.tsx';

export const appRoutes: RouteObject = {
  path: `/*`,
  element: <AppLayout />,
  children: [
    {
      path: 'home',
      element: <HomePage />,
    },
    {
      path: 'questionnaire/:id',
      element: <QuestionnairePage />,
    },
  ],
};
