import React from 'react';
import { action } from '@storybook/addon-actions';

import Table from './Table';
import themes from '../../themes';

export default {
  title: 'Table',
  component: Table,
};

export const Default = () => (
  <Table
    rows={[
      {
        size: 10,
        data: (
          <span
            style={{
              borderRadius: '100%',
              width: '2rem',
              height: '2rem',
              backgroundColor: `${themes['primary-200']}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            J
          </span>
        ),
        key: 'gravity',
      },
      { size: 15, data: <span>Jessica Linus</span>, key: 'gravity1' },
      { size: 20, data: <span>Jessica@linus.com</span>, key: 'gravity2' },
      { size: 15, data: <span>078 626 4856</span>, key: 'gravity3' },
      { size: 15, data: <span>Trainee</span>, key: 'gravity4' },
      {
        size: 20,
        data: (
          <span
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '3px',
              color: `${themes['secondary-500']}`,
              border: `1px solid ${themes['secondary-500']}`,
            }}
          >
            Invite Pending
          </span>
        ),
        key: 'gravity5',
      },
    ]}
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
          fill: `${themes['neutral-350']}`,
        },
        onClick: action('Card Liked!'),
      },
    ]}
  />
);

export const WithOptions = () => (
  <Table
    showOptionsTrigger={false}
    rows={[
      {
        size: 10,
        data: (
          <span
            style={{
              borderRadius: '100%',
              width: '2rem',
              height: '2rem',
              backgroundColor: `${themes['primary-200']}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            J
          </span>
        ),
        key: 'gravity',
      },
      { size: 15, data: <span>Jessica Linus</span>, key: 'gravity1' },
      { size: 20, data: <span>Jessica@linus.com</span>, key: 'gravity2' },
      { size: 15, data: <span>078 626 4856</span>, key: 'gravity3' },
      { size: 15, data: <span>Trainee</span>, key: 'gravity4' },
      {
        size: 20,
        data: (
          <span
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '3px',
              color: `${themes['secondary-500']}`,
              border: `1px solid ${themes['secondary-500']}`,
            }}
          >
            Invite Pending
          </span>
        ),
        key: 'gravity5',
      },
    ]}
  />
);
