/** @jsx jsx */
import { FC, useState } from 'react';
import { css, jsx } from '@emotion/core';

import theme, { remCalc } from '../../themes';
import Options, { OptionsProps } from '../Options/Options';
import Icon from '../Icon/Icon';

type CardProps = {
  /**
   * Options for extra actions that can be carried out on the card
   */
  options?: OptionsProps['options'];
  traineeCount: number;
  title: string;
  createdAt?: string;
};

type CohortCardProps = CardProps & {
  startDate: string;
  /**
   * Any given cohort can only have one active program per time.
   * This value highlights that value
   */
  currentProgram: string;
  currentProgramStartDate: string;
  currentProgramEndDate: string;
};

/**
 * Style Definitions
 */
const baseCardStyle = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme['neutral-100']};
  width: 100%;
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  padding: ${remCalc(40)} ${remCalc(35)};
  transition: box-shadow 300ms ease-in;

  &:hover {
    box-shadow: 10px 15px 25px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .options-icon {
    position: absolute;
    top: ${remCalc(21)};
    right: ${remCalc(25)};
    display: flex;
    justify-content: flex-end;
    width: 2rem;
  }

  .options {
    position: absolute;
    top: ${remCalc(57)};
    right: ${remCalc(-150)};
  }

  .title-section,
  .stat-section {
    display: flex;
    flex-direction: column;
  }

  .stat-section {
    margin-right: 1rem;
  }

  .created-at {
    text-transform: uppercase;
    color: ${theme['neutral-350']};
    font-size: ${theme.helper};
  }

  .title {
    text-transform: capitalize;
    font-size: ${theme.h4};
    font-weight: bold;
    color: ${theme['neutral-500']};
  }

  .trainees-count,
  .trainees-title {
    color: ${theme['primary-400']};
  }

  .trainees-count {
    font-size: ${theme.h2};
    font-weight: bold;
    text-align: center;
  }

  .trainees-title {
    text-transform: uppercase;
    font-size: ${theme.helper};
    font-weight: 300;
  }
`;

const cohortCardStyle = css`
  display: flex;
  width: 100%;
  max-height: ${remCalc(148)};
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 300ms linear;

  &:hover {
    box-shadow: 10px 15px 25px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    .cohort-underlay {
      width: 75%;
    }

    .cohort-primary-info .title-section {
      display: none;
    }

    .milestone {
      display: flex;
    }
  }
`;

const cohortCardOverrideStyle = css`
  flex: 1;
  box-shadow: 0;

  &.cohort-primary-info .title-section {
    text-overflow: clip;
    white-space: nowrap;
  }

  &:hover {
    box-shadow: 0;
  }
`;

const cohortCardUnderlayStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme['primary-400']};
  width: 0;
  height: inherit;
  border-radius: inherit;
  transition: width 300ms ease-out;

  .milestone {
    display: none;
    justify-content: flex-start;
    align-items: center;
    text-transform: uppercase;
    border: 1px dashes ${theme['neutral-100']};
    margin: ${remCalc(25)} ${remCalc(25)} 0 ${remCalc(25)};

    .dots {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${remCalc(20)};
      height: ${remCalc(20)};
      margin-right: ${remCalc(30)};
      border-radius: 100%;
      border: 1px dashed ${theme['neutral-100']};
      opacity: 0.5;

      &::before {
        content: ' ';
        display: block;
        background-color: ${theme['neutral-100']};
        width: ${remCalc(10)};
        height: ${remCalc(10)};
        border-radius: inherit;
      }

      .connector {
        position: absolute;
        top: 2.1rem;
        width: 1.2rem;
        border: 1px dashed ${theme['neutral-100']};
        transform: rotate(90deg);
      }
    }

    .time {
      font-size: ${theme.helper};
      font-weight: 300;
      color: ${theme['neutral-100']};
    }

    .program {
      font-size: ${theme.paragraph};
      color: ${theme['neutral-100']};
    }

    &:last-child {
      margin-top: 0;
      margin-bottom: ${remCalc(25)};
    }
  }
`;

const Card: FC<CardProps> = ({ options, traineeCount, title, createdAt }) => {
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
    <div css={baseCardStyle}>
      {options && (
        <span className='options-icon' onClick={toggleOptions}>
          <Icon name='vertical-dots' />
        </span>
      )}

      <span className='options'>
        {options && state.isOptionsToggledOn && <Options options={options} />}
      </span>

      <div className='title-section'>
        <span className='created-at'>created {createdAt}</span>
        <h4 className='title'>{title}</h4>
      </div>

      <div className='stat-section'>
        <h2 className='trainees-count'>{traineeCount}</h2>
        <span className='trainees-title'>Trainees</span>
      </div>
    </div>
  );
};

export const CohortCard: FC<CohortCardProps> = ({
  options,
  traineeCount,
  title,
  createdAt,
  startDate,
  currentProgram,
  currentProgramStartDate,
  currentProgramEndDate,
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
    <div css={cohortCardStyle}>
      {/** Card Underlay */}
      <div className='cohort-underlay' css={cohortCardUnderlayStyle}>
        {/** Start Date */}
        <section className='milestone'>
          <div className='dots'>
            <div className='connector'></div>
          </div>
          <div className='details'>
            <small className='time'>{currentProgramStartDate}</small>
            <p className='program'>{currentProgram} start date</p>
          </div>
        </section>

        {/** End Date */}
        <section className='milestone'>
          <div className='dots'></div>
          <div className='details'>
            <small className='time'>{currentProgramEndDate}</small>
            <p className='program'>{currentProgram} end date</p>
          </div>
        </section>
      </div>

      {/** Card Overlay */}
      <div
        className='cohort-primary-info'
        css={[baseCardStyle, cohortCardOverrideStyle]}
      >
        {options && (
          <span className='options-icon' onClick={toggleOptions}>
            <Icon name='vertical-dots' />
          </span>
        )}

        <span className='options'>
          {options && state.isOptionsToggledOn && <Options options={options} />}
        </span>

        <div className='title-section'>
          <span className='created-at'>
            {new Date() > new Date(startDate) ? 'started ' : 'starts '}
            {startDate}
          </span>
          <h4 className='title'>{title}</h4>
        </div>

        <div className='stat-section'>
          <h2 className='trainees-count'>{traineeCount}</h2>
          <span className='trainees-title'>Trainees</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
