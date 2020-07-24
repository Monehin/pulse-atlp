import React from 'react';
import { action } from '@storybook/addon-actions';

import Checkbox, { CheckboxGroup } from './Checkbox';

export default {
  title: 'Checkbox Group',
  component: CheckboxGroup
}

/**
 * Generic  handler for when a radio button within a group is clicked 
 */
const handler = (id: string) => { action(`Checkbox Option with Id: "${id}" was Clicked`)(); };

export const Default = () => (
  <CheckboxGroup name="what" handler={handler}>
    <Checkbox id="Rule" isActive />
    <Checkbox id="The World" />
  </CheckboxGroup>
);

export const WithTitle = () => (
  <CheckboxGroup name="what" handler={handler} sectionTitle={'Breakfast'}>
    <Checkbox id="Isombe" />
    <Checkbox id="Ibijumba" />
  </CheckboxGroup>
);

export const HorizontalWithTitle = () => (
  <CheckboxGroup name="what" handler={handler} sectionTitle={'Breakfast'} orientation={'horizontal'}>
    <Checkbox id="American Breakfast" />
    <Checkbox id="British Breakfast" />
  </CheckboxGroup>
);
