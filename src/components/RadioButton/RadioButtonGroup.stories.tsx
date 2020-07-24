import React from 'react';
import { action } from '@storybook/addon-actions';

import RadioButton, { RadioButtonGroup } from './RadioButton';

export default {
  title: 'Radio Button Group',
  component: RadioButtonGroup
}

/**
 * Generic  handler for when a radio button within a group is clicked 
 */
const handler = (id: string) => { action(`Radio Option with Id: "${id}" was Clicked`)(); };

export const Default = () => (
  <RadioButtonGroup name="what" handler={handler}>
    <RadioButton id="Rule" isActive />
    <RadioButton id="The World" />
  </RadioButtonGroup>
);

export const WithTitle = () => (
  <RadioButtonGroup name="what" handler={handler} sectionTitle={'Breakfast'}>
    <RadioButton id="Isombe" isActive />
    <RadioButton id="Ibijumba" />
  </RadioButtonGroup>
);

export const HorizontalWithTitle = () => (
  <RadioButtonGroup name="what" handler={handler} sectionTitle={'Breakfast'} orientation={'horizontal'}>
    <RadioButton id="American Breakfast" isActive />
    <RadioButton id="British Breakfast" />
  </RadioButtonGroup>
);
