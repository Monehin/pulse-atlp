import React from 'react';

import Modal from './Modal';

export default {
  title: 'Modal',
  component: Modal,
};

export const Default = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <Modal
      title='Create A New User'
      description='Add users for all relevant roles. Invites will be sent to recipients'
      content={<div>Some relevant content</div>}
    />
  </div>
);
