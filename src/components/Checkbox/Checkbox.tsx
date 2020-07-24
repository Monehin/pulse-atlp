/** @jsx jsx */
import { FC, Fragment, cloneElement, ReactElement, useState } from 'react';
import { css, jsx } from '@emotion/core';

import theme, { remCalc } from '../../themes';
import Icon from '../Icon/Icon';

type CheckboxProps = {
  /**
   * This is displayed as the title of the Checkbox and is also
   * used to uniquely identify the Checkbox i.e as it's value
   */
  id: string;
  isActive?: boolean;
  onClick?: () => void;
  /**
   * This specifies what the value of this Checkbox should be assigned to as the input.
   * It's passed down automatically when you use the Checkbox within a checkbox group
   */
  name?: string;
};

type CheckboxGroupProps = {
  /**
   * The name of the value you're trying to capture. For instance, it could be items in a
   * cart. It's children could for instance be "sneakers", "ice cream"
   */
  name: string;
  /**
   * Name of the section with the collection of Checkboxs that shows up on the UI.
   * The "name" attribute is for code only.
   */
  sectionTitle?: string;
  /**
   * The ID of the Checkbox will be injected into the handler
   */
  handler: (id: string) => void;
  /**
   * Specifies how you want the buttons to be stacked, vertically or horizontally.
   * Default is vertical.
   *
   * Valid values are 'vertical' or 'horizontal'
   */
  orientation?: string;
  children: ReactElement<CheckboxProps>[];
};

/**
 * Style Declararations
 */
const CheckboxStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  input {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${remCalc(20)};
    height: ${remCalc(20)};
    border: 3px solid ${theme['neutral-350']};
    border-radius: 3px;
    margin-right: ${remCalc(15)};
  }

  label {
    color: ${theme['neutral-350']};

    &:hover {
      cursor: pointer;
    }
  }

  &.active {
    .container {
      background-color: ${theme['primary-500']};
      border-color: ${theme['primary-500']};
    }

    label {
      font-weight: bold;
      color: ${theme['primary-500']};
    }
  }
`;

const CheckboxGroupStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .checkbox {
    margin-bottom: ${remCalc(30)};
  }
`;

const CheckboxGroupHorizontalStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  .checkbox {
    margin-bottom: 0;
    margin-right: ${remCalc(30)};
  }
`;

const sectionTitleStyle = css`
  font-size: ${theme.paragraph};
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: ${remCalc(25)};
  color: ${theme['neutral-400']};
`;

const Checkbox: FC<CheckboxProps> = ({
  isActive = false,
  id,
  onClick,
  name,
}) => (
  <span
    css={CheckboxStyle}
    onClick={onClick}
    className={`checkbox ${isActive && 'active'}`}
  >
    <span className={'container'}>
      {isActive && <Icon name='tick' width={18} height={14} />}
    </span>
    <label htmlFor={id}>{id}</label>
    <input id={id} type='radio' name={name} />
  </span>
);

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  name,
  handler,
  orientation = 'vertical',
  children: checkboxes,
  sectionTitle,
}) => {
  const [activeCheckboxIds, updateActiveCheckboxIds] = useState<string[]>([]);
  const isActiveCheckbox = (checkboxProps: CheckboxProps): boolean => {
    if (checkboxProps.isActive && activeCheckboxIds.length === 0) {
      // user has most likely not clicked anything
      return true;
    }

    return activeCheckboxIds.includes(checkboxProps.id);
  };

  /**
   * Returns a closure that has the right radio button id prop enclosed in it's scope
   */
  const onClickGenerator = (checkboxProps: CheckboxProps) => () => {
    let updatedActiveIds: string[];

    // toggle active status of the checkbox
    if (activeCheckboxIds.includes(checkboxProps.id)) {
      updatedActiveIds = activeCheckboxIds.filter(
        (checkboxId) => checkboxId !== checkboxProps.id
      );
    } else {
      updatedActiveIds = [...activeCheckboxIds, checkboxProps.id];
    }

    updateActiveCheckboxIds(updatedActiveIds);
    handler(checkboxProps.id);
  };

  return (
    <Fragment>
      {sectionTitle && <p css={sectionTitleStyle}>{sectionTitle}</p>}

      {/** Actual Radio Buttons */}
      <section
        css={css`
          ${CheckboxGroupStyle}
          ${orientation === 'horizontal' && CheckboxGroupHorizontalStyle}
        `}
      >
        {checkboxes.map((checkbox) =>
          cloneElement(checkbox, {
            name,
            onClick: onClickGenerator(checkbox.props),
            isActive: isActiveCheckbox(checkbox.props),
            key: checkbox.props.id,
          })
        )}
      </section>
    </Fragment>
  );
};

export default Checkbox;
