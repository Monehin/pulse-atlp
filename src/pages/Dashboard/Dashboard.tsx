/** @jsx jsx */
import { jsx } from '@emotion/core';

import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import theme from '../../themes';

const DashboardPage = () => (
  <div className='empty-state'>
    <Icon
      width={55}
      height={50}
      viewBox={{ width: 35, height: 30 }}
      fill={theme['primary-500']}
      name='dashboard'
    />
    <h4 className='title'>There's no data here</h4>
    <p className='desc'>Go ahead and create some data</p>
    <Button onClick={() => {}}>Toggle Modal</Button>
  </div>
);

export default DashboardPage;
