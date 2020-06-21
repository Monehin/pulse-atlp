import React from 'react';
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** @jsx jsx */

const summaryCardStyle = css`
  border-radius: 3px;
  padding: 2rem;
  color: var(--primary-400);
  display: flex;
  min-width: 200px;
  justify-content: space-between;
  align-items: center;

  .agregateTotal {
    display: grid;
    grid-gap: 1.5rem;
    font-size: 1.6rem;
    flex-direction: column;
  }

  h3 {
    font-weight: 500;
    font-size: 1rem;
  }

  .fontIcon {
    font-size: 1.6rem;
  }
`;

const SummaryCards = ({ total, color, icon, text }: any) => {
  return (
    <div
      className='summaryCard shadow'
      css={summaryCardStyle}
      style={{ backgroundColor: color }}
    >
      <div className='agregateTotal'>
        <div className=''>{total}</div>
        <h3>{text}</h3>
      </div>
      <div className='fontIcon'>
        <FontAwesomeIcon className='' icon={icon} size='sm' />
      </div>
    </div>
  );
};

export default SummaryCards;
