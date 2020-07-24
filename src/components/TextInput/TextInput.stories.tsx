import React, { ChangeEvent } from 'react';
import { action }from '@storybook/addon-actions'

import TextInput from './TextInput';

type Story = () => {};

export default {
  title: 'Text Input',
  component: TextInput,
  decorators: [(story: Story) => (<div style={{width: '25rem'}}>{story()}</div>)]
}

export const Default = () => <TextInput placeholder="Firstname" onChange={(event: ChangeEvent<HTMLElement>) => {
  action(`${(event.target as HTMLInputElement).value}`)();
}} />

export const Active = () => <TextInput focused placeholder="Firstname" />

export const Error = () => <TextInput error={'Too long'} placeholder="Firstname" />

