import React from 'react';

import Nav from './Nav';

export default {
  title: 'Nav',
  component: Nav,
};

export const Default = () => <Nav />;

export const WithUnauthorizedMenuItems = () => (
  <Nav unauthorizedMenuItems={['cohorts', 'programs']} />
);
