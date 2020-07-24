import React from 'react';

import Icon from './Icon';

type Story = () => {};

export default {
  title: 'Icon',
  component: Icon,
  decorators: [
    (story: Story) => (
      <div
        style={{
          backgroundColor: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '5rem',
          height: '5rem',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export const User = () => <Icon name='user' />;
