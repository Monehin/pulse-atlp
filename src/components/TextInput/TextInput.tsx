/** @jsx jsx */

import { useState, FC, ReactNode, ChangeEvent } from "react";
import { css, jsx } from "@emotion/core";

import theme, { remCalc } from '../../themes';
import Icon from '../Icon/Icon';

type TextInputProps = {
  /**
   * A string identifying the error with the data inputed.
   * Only shows one error per time, hence why it's a string not an Array of strings
   */
  error?: string;
  /**
   * Specify an SVG icon to render with the button
   */
  icon?: ReactNode;
  /**
   * Simulate the look and feel when the text is focused
   */
  focused?: boolean;
  placeholder: string;
  disabled?: boolean;
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

  &.focused, &:focus, &:active {
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

  &.error {
    border-color: ${theme['error-100']};
  }
`;

const textInputContainerStyle = css`
  position: relative;
  width: 100%;
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

const TextInput: FC<TextInputProps> = ({ error = '', focused = false, placeholder, onChange, disabled }) => {
  let iconColor = theme['neutral-300'];
  const [textInputState, setTextInputState] = useState<TextInputState>({ isFocused: false });
  
  if (focused || textInputState.isFocused) {
    iconColor = theme['primary-500'];
  }

  if (error.length > 0) {
    iconColor = theme['error-100'];
  }

  return (
    <div css={[textInputContainerStyle]}>
      <input
        placeholder={placeholder}
        disabled={disabled}
        type="text"
        css={inputFieldStyle}
        className={`${focused && 'focused'} ${error.length > 0 && 'error'}`}
        onChange={onChange}
        onFocus={() => setTextInputState({ isFocused: true })}
        onBlur={() => setTextInputState({ isFocused: false })}
      />

      {/* Text Input Icon */}
      <div css={textInputIconStyle}>
        <Icon name="user" fill={iconColor}/>
      </div>

      {/* Floating Title */}
      <caption css={textInputTitleStyle} className={`title ${error.length > 0 && 'error'}`}>{placeholder}</caption>

      {(error.length > 0) && (
        <caption css={[textInputTitleStyle, errorCaptionStyle]} className={'error'}>{error}</caption>
      )}
    </div>
  )
};

export default TextInput;
