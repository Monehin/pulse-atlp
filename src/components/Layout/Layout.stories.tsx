import React from 'react';

import Layout from './Layout';
import Button from '../Button/Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Layout',
  component: Layout,
};

export const Default = () => (
  <Layout
    render={(toggleModal, setModalContent) => {
      const callback = () => {
        // setModalContent(
        //   'Create Something',
        //   'let there be light',
        //   <Button onClick={toggleModal}>Toggle Modal</Button>
        // );
      };

      return (
        <div>
          Toggle me
          <br />
          <br />
          <Button onClick={callback}>Toggle Modal</Button>
        </div>
      );
    }}
  />
);

export const EmptyPage = () => (
  <Layout
    render={(toggleModal, setModalContent) => {
      return (
        <div className='empty-state'>
          <h4 className='title'>There's no data here</h4>
          <p className='desc'>Go ahead and create some data</p>
          <Button onClick={action('Create Data')}>Create Data</Button>
        </div>
      );
    }}
  />
);
