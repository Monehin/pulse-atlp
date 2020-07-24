import React from 'react';
import { action } from '@storybook/addon-actions';

import Tab, { TabGroup } from './Tab';

export default {
  title: 'Tab Group',
  component: TabGroup
}

/**
 * Generic  handler for when a radio button within a group is clicked 
 */
const handler = (id: string) => { action(`Radio Option with Id: "${id}" was Clicked`)(); };

export const Default = () => (
  <TabGroup handler={handler}>
    <Tab id="Cool" tabContent={<span>I think I made it</span>} isActive />
    <Tab id="Not Cool" tabContent={<span>I can't explain it</span>} />
  </TabGroup>
);
