import React from 'react';

import Tab from './Tab';

export default {
  title: 'Tab',
  component: Tab
}

export const Default = () => <Tab id="Rules" tabContent={<div>Wild Wild Wild</div>} />

export const Active = () => <Tab id="Ruler" isActive tabContent={<div>Miles Miles Miles</div>} />
