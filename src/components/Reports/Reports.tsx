import React from 'react';
import { css, jsx } from '@emotion/core';
import SummaryCard from './SummaryCard/SummaryCard';
/** @jsx jsx */

const Reports = () => {
  const overviewCard = [
    {
      total: 4,
      color: 'var(--neutral-100)',
      icon: ['fas', 'graduation-cap'],
      text: 'Cohorts',
    },
    {
      total: 83,
      color: 'var(--neutral-100)',
      icon: ['fas', 'users'],
      text: 'Trainees',
    },
    {
      total: 4,
      color: 'var(--neutral-100)',
      icon: ['fas', 'door-open'],
      text: 'Dropout',
    },
    {
      total: '9/10',
      color: 'var(--neutral-100)',
      icon: ['fas', 'chart-area'],
      text: 'Net Promoter Score',
    },
  ];

  return (
    <div className='reports' css={reportStyle}>
      <div className='overviewCards'>
        {overviewCard.map((card, index) => (
          <SummaryCard {...card} key={index} />
        ))}
      </div>
    </div>
  );
};

const reportStyle = css`
  .overviewCards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 2rem;
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 1080px) {
    .overviewCards {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 650px) {
    .overviewCards {
      grid-template-columns: 1fr;
    }
  }
`;

export default Reports;
