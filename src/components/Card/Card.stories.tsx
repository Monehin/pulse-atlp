import React from 'react';
import { action } from '@storybook/addon-actions';

import theme from '../../themes';
import Card, { CohortCard } from './Card';

export default {
  title: 'Card',
  component: Card,
};

export const Default = () => (
  <div style={{ width: '30rem' }}>
    <Card
      title='Bootcamp'
      traineeCount={27}
      createdAt={'20th july, 2020'}
      options={[
        {
          title: 'Like Card',
          icon: {
            name: 'heart',
          },
          onClick: action('Card Liked!'),
        },
        {
          title: 'Delete Card',
          icon: {
            name: 'cohorts',
            fill: `${theme['neutral-350']}`,
          },
          onClick: action('Card Liked!'),
        },
      ]}
    />
  </div>
);

export const Cohort = () => (
  <div style={{ width: '30rem' }}>
    <CohortCard
      title='Cohort 1'
      traineeCount={30}
      currentProgram='bootcamp'
      currentProgramStartDate='12 jul 2020'
      currentProgramEndDate='21 dec 2020'
      startDate={'20th july, 2020'}
    />
  </div>
);

export const WithoutOptions = () => (
  <div style={{ width: '30rem' }}>
    <Card title='Cohort 1' traineeCount={30} createdAt={'20th july, 2020'} />
  </div>
);
