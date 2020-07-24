import React from 'react';

import Checkbox from './Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox
}

export const Default = () => <Checkbox id="Rules" />

export const Active = () => <Checkbox id="Ruler" isActive />

