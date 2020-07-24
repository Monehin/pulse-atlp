/** @jsx jsx */
import { FC, MouseEvent } from 'react';
import { css, jsx } from '@emotion/core';

import theme, { remCalc } from '../../themes';
import Icon from '../Icon/Icon';

export type OptionsProps = {
  options: {
    title: string;
    onClick: ($event: MouseEvent) => void;
    icon?: { name: string; fill?: string };
  }[];
};

/**
 * Style Definitions
 */
const optionsStyle = css`
  background-color: ${theme['neutral-100']};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);

  .option {
    display: flex;
    justify-content: flex-start;
    padding: ${remCalc(10)} ${remCalc(15)};
    border-bottom: 1px solid ${theme['neutral-300']};

    .title {
      font-size: ${theme.paragraph};
      color: ${theme['neutral-350']};
      margin-left: 1rem;
      white-space: nowrap;

      &:hover {
        color: ${theme['primary-400']};
      }
    }

    &:last-of-type {
      border: 0;
    }
  }
`;

const Options: FC<OptionsProps> = ({ options }) => {
  return (
    <div css={optionsStyle}>
      {options.map((option) => (
        <a
          className='option'
          onClick={option.onClick}
          href={`#/${option.title}`}
          key={option.title}
        >
          {option.icon && (
            <span className='icon'>
              <Icon name={option.icon.name} fill={option.icon.fill} />
            </span>
          )}
          <span className='title'>{option.title}</span>
        </a>
      ))}
    </div>
  );
};

export default Options;
