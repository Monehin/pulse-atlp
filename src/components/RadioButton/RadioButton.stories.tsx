import React from 'react';

import RadioButton from './RadioButton';

export default {
  title: 'Radio Button',
  component: RadioButton
}

export const Default = () => <RadioButton id="Rules" />

export const Active = () => <RadioButton id="Ruler" isActive />
