/** @jsx jsx */
import { FC, Fragment, cloneElement, ReactElement, useState } from "react";
import { css, jsx } from "@emotion/core";

import theme, { remCalc } from "../../themes";

type RadioButtonProps = {
  /**
   * This is displayed as the title of the button and is also
   * used to uniquely identify the button i.e as it's value
   */
  id: string;
  isActive?: boolean;
  onClick?: () => void;
  /**
   * This specifies what the value of this button should be assigned to as the input.
   * It's passed down automatically when you use the button within a button group
   */
  name?: string;
};

type RadioButtonGroupProps = {
  /**
   * The name of the value you're trying to capture. For instance, it could be gender
   * when it's children buttons are male and female
   */
  name: string;
  /**
   * Name of the section with the collection of buttons that shows up on the UI.
   * The "name" attribute is for code only.
   */
  sectionTitle?: string;
  /**
   * The ID of the Radio button will be injected into the handler
   */
  handler: (id: string) => void;
  /**
   * Specifies how you want the buttons to be stacked, vertically or horizontally.
   * Default is vertical.
   *
   * Valid values are 'vertical' or 'horizontal'
   */
  orientation?: string;
  children: ReactElement<RadioButtonProps>[];
};

/**
 * Style Declararations
 */
const radioButtonStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  input {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }

  .donut {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${remCalc(20)};
    height: ${remCalc(20)};
    border: 3px solid ${theme["neutral-350"]};
    border-radius: 100%;
    margin-right: ${remCalc(15)};

    &::before {
      display: block;
      content: " ";
      width: ${remCalc(10)};
      height: ${remCalc(10)};
      border-radius: inherit;
    }
  }

  label {
    color: ${theme["neutral-350"]};

    &:hover {
      cursor: pointer;
    }
  }

  &.active {
    .donut {
      border-color: ${theme["primary-500"]};

      &::before {
        background-color: ${theme["primary-500"]};
      }
    }

    label {
      font-weight: bold;
      color: ${theme["primary-500"]};
    }
  }
`;

const radioButtonGroupStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .radio-btn {
    margin-bottom: ${remCalc(30)};
  }
`;

const radioButtonGroupHorizontalStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  .radio-btn {
    margin-bottom: 0;
    margin-right: ${remCalc(30)};
  }
`;

const sectionTitleStyle = css`
  font-size: ${theme.paragraph};
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: ${remCalc(25)};
  color: ${theme["neutral-400"]};
`;

const RadioButton: FC<RadioButtonProps> = ({
  isActive = false,
  id,
  onClick,
  name
}) => (
  <span
    css={radioButtonStyle}
    onClick={onClick}
    className={`radio-btn ${isActive && "active"}`}
  >
    <span className={"donut"}></span>
    <label htmlFor={id}>{id}</label>
    <input id={id} type="radio" name={name} />
  </span>
);

export const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  name,
  handler,
  orientation = "vertical",
  children: buttons,
  sectionTitle
}) => {
  const [activeButtonId, setActiveButtonId] = useState('');
  const isActiveButton = (btnProps: RadioButtonProps): boolean => {
    if (btnProps.isActive && activeButtonId === '') {
      // user has most likely not clicked anything
      return true;
    }

    if (activeButtonId !== '') {
      return btnProps.id === activeButtonId;
    }

    return false;
  };

  /**
   * Returns a closure that has the right radio button id prop enclosed in it's scope
   */
  const onClickGenerator = (btnProps: RadioButtonProps) => () => {
    setActiveButtonId(btnProps.id);
    handler(btnProps.id);
  };

  return (
    <Fragment>
      {sectionTitle && <p css={sectionTitleStyle}>{sectionTitle}</p>}

      {/** Actual Radio Buttons */}
      <section
        css={
          css`${radioButtonGroupStyle} ${orientation === "horizontal" && radioButtonGroupHorizontalStyle}`
        }
      >
        {buttons.map(btn =>
          cloneElement(btn, {
            name,
            onClick: onClickGenerator(btn.props),
            isActive: isActiveButton(btn.props),
            key: btn.props.id
          })
        )}
      </section>
    </Fragment>
  );
};

export default RadioButton;
