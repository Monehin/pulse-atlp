/** @jsx jsx */

import { useState, FC, ChangeEvent } from 'react';
import { css, jsx } from '@emotion/core';

import theme, { remCalc } from '../../themes';
import Icon from '../Icon/Icon';

type TextInputProps = {
  /**
   * A string identifying the error with the data inputed.
   * Only shows one error per time, hence why it's a string not an Array of strings
   */
  error?: string;
  /**
   * Specify an SVG icon name to render with the button
   */
  iconProps?: { title: string; width?: number; height?: number };
  /**
   * Simulate the look and feel when the text is focused
   */
  focused?: boolean;
  placeholder: string;
  disabled?: boolean;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type TextInputState = {
  isFocused: boolean;
};

/**
 * Style Declarations
 */
const inputFieldStyle = css`
  width: inherit;
  outline: transparent;
  padding: ${remCalc(10)} ${remCalc(15)};
  color: ${theme['neutral-500']};
  border: 3px solid ${theme['neutral-300']};
  border-radius: 3px;
  box-sizing: border-box;

  &::placeholder {
    color: ${theme['neutral-350']};
  }

  &.focused,
  &:focus,
  &:active {
    border-color: ${theme['primary-500']};

    ~ .title {
      background-color: ${theme['primary-500']};
      color: ${theme['neutral-100']};
      opacity: 1;
      top: -1rem;

      &.error {
        background-color: ${theme['error-100']};
      }
    }
  }

  &[disabled] {
    background-color: ${theme['neutral-200']};

    &:hover {
      cursor: not-allowed;
    }
  }

  &.error {
    border-color: ${theme['error-100']};
  }
`;

const textInputContainerStyle = css`
  position: relative;
  width: 100%;
`;

export const formStyle = css`
  form,
  .row {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .grid-area {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
  }

  .col {
    grid-column: auto / span 1;
    grid-row: auto / span 1;
  }

  .row {
    margin-bottom: ${remCalc(30)};

    &.submit {
      justify-content: flex-end;
      margin-bottom: 0;
      margin-top: 1rem;
    }
  }
`;

const textInputTitleStyle = css`
  position: absolute;
  top: 0rem;
  left: 0.5rem;
  background-color: ${theme['neutral-300']};
  min-width: 1rem;
  height: ${remCalc(17)};
  padding: 0.2rem 0.3rem 0.1rem 0.3rem;
  border-radius: 3px 3px 0 0;
  font-size: ${theme.helper};
  color: ${theme['neutral-100']};
  line-height: 0.8;
  opacity: 0;

  /* Animate Title */
  transition: opacity 1s linear;
  transition: top 150ms linear;
`;

const textInputIconStyle = css`
  position: absolute;
  right: ${remCalc(18)};
  top: ${remCalc(15)};
`;

const errorCaptionStyle = css`
  top: initial;
  bottom: -1rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0 0 3px 3px;

  &.error {
    background-color: ${theme['error-100']};
    opacity: 1;
  }
`;

const TextInput: FC<TextInputProps> = ({
  error = '',
  iconProps,
  focused = false,
  placeholder,
  onChange,
  disabled,
  name,
  type,
  value,
}) => {
  let iconColor = theme['neutral-300'];
  const [textInputState, setTextInputState] = useState<TextInputState>({
    isFocused: false,
  });

  if (focused || textInputState.isFocused) {
    iconColor = theme['primary-500'];
  }

  if (error.length > 0) {
    iconColor = theme['error-100'];
  }

  const onFocusHandler = () => setTextInputState({ isFocused: true });
  const onBlurHandler = () => setTextInputState({ isFocused: false });

  return (
    <div css={[textInputContainerStyle]}>
      {/* Uncontrolled by default */}
      {!value && (
        <input
          placeholder={placeholder}
          disabled={disabled}
          css={inputFieldStyle}
          className={`${focused && 'focused'} ${error.length > 0 && 'error'}`}
          onChange={onChange}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          name={name}
          type={type || 'text'}
        />
      )}

      {/* We explicitly want this to be a controlled component */}
      {value && (
        <input
          placeholder={placeholder}
          disabled={disabled}
          css={inputFieldStyle}
          className={`${focused && 'focused'} ${error.length > 0 && 'error'}`}
          onChange={onChange}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          name={name}
          type={type || 'text'}
          value={value}
        />
      )}

      {/* Text Input Icon */}
      <div css={textInputIconStyle}>
        {iconProps && (
          <Icon
            name={iconProps.title}
            fill={iconColor}
            width={iconProps.width}
            height={iconProps.height}
          />
        )}
      </div>

      {/* Floating Title */}
      <span
        css={textInputTitleStyle}
        className={`title ${error.length > 0 && 'error'}`}
      >
        {placeholder}
      </span>

      {error.length > 0 && (
        <span
          css={[textInputTitleStyle, errorCaptionStyle]}
          className={'error'}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default TextInput;
