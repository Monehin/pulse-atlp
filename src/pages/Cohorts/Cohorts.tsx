/** @jsx jsx */

import { jsx } from '@emotion/core';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import theme from '../../themes';

const CohortsPage = () => (
  <Layout
    render={(toggleModal, setModalContent) => {
      return (
        <div className='empty-state'>
          <Icon
            width={55}
            height={50}
            viewBox={{ width: 35, height: 30 }}
            fill={theme['primary-500']}
            name='cohorts'
          />
          <h4 className='title'>There's no data here</h4>
          <p className='desc'>Go ahead and create some data</p>
          <Button onClick={() => console.log('Create Data')}>
            Create Data
          </Button>
        </div>
      );
    }}
  />
);

export default CohortsPage;
