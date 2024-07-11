import React from 'react';
import { MainContainer } from '../wrappers/main-container/main-container.tsx';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC = () => {
  return (
    <MainContainer>
      <Outlet />
    </MainContainer>
  );
};
