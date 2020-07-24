/** @jsx jsx */
import { FC, ReactElement, useState } from 'react';
import { css, jsx } from '@emotion/core';

import theme, { remCalc } from '../../themes';
import Icon from '../Icon/Icon';
import Options, { OptionsProps } from '../Options/Options';

type TableProps = {
  /**
   * Show/hide extra actions button
   */
  showOptionsTrigger?: boolean;
  /**
   * Options for extra actions that can be carried out on the card
   */
  options?: OptionsProps['options'];
  rows: {
    data: ReactElement<HTMLElement>;
    /**
     * How much real estate should this data point occupy
     */
    size: number;
    /**
     * This uniquely identifies this row
     */
    key: string;
  }[];
};

/**
 * Style Definitions
 */
const tableStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${remCalc(50)};
  margin: ${remCalc(10)} 0;
  padding: ${remCalc(10)} ${remCalc(30)};
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 300ms ease-in;

  .evaluated-option {
    color: ${theme['neutral-500']};
    font-size: ${theme.paragraph};
  }

  .options {
    position: relative;
    height: 90%;

    &:hover {
      cursor: pointer;
    }

    .dropdown {
      position: absolute;
      top: 2rem;
      right: -2rem;
    }
  }

  &:hover {
    box-shadow: 10px 15px 25px rgba(0, 0, 0, 0.1);
  }
`;

const Table: FC<TableProps> = ({
  rows,
  options,
  showOptionsTrigger = true,
}) => {
  const [state, setState] = useState({ isOptionsToggledOn: false });

  /**
   * Add functionality to toggle the card's options
   */
  if (options) {
    options = options.map((option) => ({
      ...option,
      onClick: ($event) => {
        $event.preventDefault();
        setState({ isOptionsToggledOn: !state.isOptionsToggledOn });
        option.onClick($event);
      },
    }));
  }

  const toggleOptions = () =>
    setState({ isOptionsToggledOn: !state.isOptionsToggledOn });

  return (
    <div css={tableStyle}>
      {rows.map((row) => (
        <section
          className='evaluated-option'
          key={row.key}
          css={css`
            width: ${row.size}%;
          `}
        >
          {row.data}
        </section>
      ))}

      {showOptionsTrigger && (
        <section className='options' onClick={toggleOptions}>
          <Icon name='horizontal-dots' />
          <span className='dropdown'>
            {options && state.isOptionsToggledOn && (
              <Options options={options} />
            )}
          </span>
        </section>
      )}
    </div>
  );
};

export default Table;
