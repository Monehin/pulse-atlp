/**@jsx jsx */

import { FC, ReactNode } from 'react';
import { css, jsx, SerializedStyles } from '@emotion/core';

import theme, { remCalc } from '../../themes';

type ButtonProps = {
  children: ReactNode;
  /**
   * On click handler
   */
  onClick?: () => void;
  /**
   * Values can be any of
   * primary, secondary or tertiary
   */
  type?: string;
  /**
   * Values can be any of
   * small, regular or large
   */
  size?: string;
  /**
   * Specify an SVG icon to render with the button
   */
  icon?: ReactNode;
  disabled?: boolean;
};

type StyleGroupProps = {
  [key: string]: SerializedStyles;
};

/**
 * Style Declarations
 */
const baseStyle = css`
  display: flex;
  align-items: center;
  outline: transparent;
  border: 0;

  > .btn-icon {
    display: inline-block;
    margin-right: 1rem;
    line-height: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

const sizes: StyleGroupProps = {
  small: css`
    padding: ${remCalc(12)} ${remCalc(15)};
    font-size: ${theme.helper};
  `,
  regular: css`
    padding: ${remCalc(15)} ${remCalc(20)};
    font-size: ${theme.paragraph};
  `,
  large: css`
    padding: ${remCalc(20)} ${remCalc(30)};
    font-size: ${theme.h5};
  `,
};

const types: StyleGroupProps = {
  primary: css`
    background-color: ${theme['primary-500']};
    box-shadow: 0px 2px 4px rgba(8, 35, 48, 0.4);
    border-radius: 3px;
    color: ${theme['neutral-100']};
    transition: all 300ms linear;

    &:hover {
      background-color: ${theme['primary-400']};
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    }
  `,
  secondary: css`
    background-color: transparent;
    box-shadow: 0px 2px 4px rgba(8, 35, 48, 0.2);
    border: 1px solid ${theme['primary-500']};
    border-radius: 3px;
    color: ${theme['primary-500']};
    transition: all 300ms linear;

    &:hover {
      background-color: transparent;
      color: ${theme['primary-400']};
      border-color: ${theme['primary-400']};
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.09);
    }
  `,
  tertiary: css`
    background-color: transparent;
    box-shadow: 0px 2px 4px rgba(8, 35, 48, 0.2);
    border-radius: 3px;
    color: ${theme['primary-500']};
    transition: all 300ms linear;

    &:hover {
      background-color: transparent;
      color: ${theme['primary-400']};
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.09);
    }
  `,
};

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  icon,
  size = 'regular',
  type = 'primary',
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      css={[baseStyle, sizes[size], types[type]]}
      disabled={disabled}
    >
      {icon && <span className={'btn-icon'}>{icon}</span>}{' '}
      <span>{children}</span>
    </button>
  );
};

export default Button;
