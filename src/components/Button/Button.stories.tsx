import React from 'react';
import { action }from '@storybook/addon-actions';

import Button from './Button';
import Icon from '../Icon/Icon';

export default {
  title: 'Buttons',
  component: Button
}

/**
 * Primary Buttons
 */
export const Primary = () => <Button onClick={action('Primary Regular Button Clicked')}>Primary Button</Button>

export const PrimaryIcon = () => <Button icon={<Icon name="user"/>} onClick={action('Primary Regular Icon Button Clicked')}>Primary Icon Button</Button>

export const PrimarySmall = () => <Button size="small" type="primary" onClick={action('Primary Small Button Clicked')}>Primary Small Button</Button>

export const PrimaryLarge = () => <Button size="large" type="primary" onClick={action('Primary Large Button Clicked')}>Primary Large Button</Button>

/**
 * Secondary Buttons
 */
export const Secondary = () => <Button type="secondary" onClick={action('Secondary Regular Button Clicked')}>Secondary Regular Button</Button>

export const SecondarySmall = () => <Button size="small" type="secondary" onClick={action('Secondary Small Button Clicked')}>Secondary Small Button</Button>

export const SecondaryLarge = () => <Button size="large" type="secondary" onClick={action('Secondary Large Button Clicked')}>Secondary Large Button</Button>

/**
 * Tertiary Buttons
 */
export const Tertiary = () => <Button type="tertiary" onClick={action('Tertiary Regular Button Clicked')}>Tertiary Regular Button</Button>

export const TertiarySmall = () => <Button size="small" type="tertiary" onClick={action('Tertiary Small Button Clicked')}>Tertiary Small Button</Button>

export const TertiaryLarge = () => <Button size="large" type="tertiary" onClick={action('Tertiary Large Button Clicked')}>Tertiary Large Button</Button>
