/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState, ChangeEvent, FormEvent, Fragment } from 'react';

// types
import { Program } from '../Programs/Programs';

// components
import { CohortCard } from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import TextInput, { formStyle } from '../../components/TextInput/TextInput';
import Icon from '../../components/Icon/Icon';
import theme, { remCalc } from '../../themes';
import useModal from '../../components/Modal/Modal';
import Loading from '../../components/Loading/Loading';

// Model
import CohortModel from '../../models/CohortModel';

// others
import { ValidationError } from 'joi';
import ProgramModel from '../../models/ProgramModel';

type ProgramDates = {
  id: string;
  startDate: Date;
  endDate: Date;
};

type Cohort = {
  id?: string;
  name: string;
  startDate: Date;
  createdAt: Date;
  traineeCount: number;
  programDates: ProgramDates[];
};

type FormErrors = {
  name: string;
  startedAt: string;
};

/**
 * Style declarations
 */
const cohortPageStyle = css`
  .toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${remCalc(30)};
  }

  .cohorts {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 2rem;
    grid-column-gap: 1rem;

    .cohort {
      grid-row: auto / span 1;
      grid-column: auto / span 1;
    }
  }
`;

/**
 * Generate Modal content
 *
 * @params {Array} cohorts
 * @param {Function} cohortPrograms
 * @returns {HTMLElement}
 */
const getModalContent = (
  cohorts: Cohort[],
  programs: { [id: string]: Program },
  updateCohorts: (cohorts: Cohort[]) => void,
  errors: FormErrors,
  updateErrors: Function,
  newCohort: Cohort,
  updateNewCohort: Function,
  isCreatingCohort: boolean,
  updateCreatingCohortStatus: Function,
  toggleModal: Function
) => {
  /*
   * delete value if it's the default set in the template newCohort object.
   * taking this approach because we have "startDate" set as required on the Cohort,
   * so we needed a dummy date value on newCohort, or it won't conform to the "Cohort" type
   */
  if (
    newCohort.startDate.toDateString() === new Date('1970-01-01').toDateString()
  ) {
    delete newCohort.startDate;
  }

  const newCohortOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    newCohort = { ...newCohort, [event.target.name]: event.target.value };

    if (event.target.name === 'startDate') {
      newCohort.startDate = new Date(newCohort.startDate);

      // auto populate program dates
      let programDurationInSeconds;
      let startDate: Date, endDate: Date;

      // in case they change dates while on the form, make sure programDates values are not duplicated
      newCohort.programDates = [];

      Object.keys(programs).forEach((programID) => {
        programDurationInSeconds =
          programs[programID].durationInWeeks * 7 * 24 * 60 * 60 * 1000;

        startDate =
          !startDate && newCohort.startDate
            ? newCohort.startDate
            : new Date(endDate.getTime() + 24 * 60 * 60 * 1000); // add one day to the last end date

        endDate = new Date(startDate.getTime() + programDurationInSeconds);

        newCohort.programDates = [
          ...newCohort.programDates,
          { id: programID, startDate, endDate },
        ];
      });

      // update the corresponding dates
      updateNewCohort(newCohort);
    }
  };

  const addNewCohortHandler = async ($event: FormEvent) => {
    try {
      $event.preventDefault();
      updateCreatingCohortStatus(true);
      const docRef = await CohortModel.create(newCohort);
      updateCreatingCohortStatus(false);
      toggleModal();
      updateCohorts([...cohorts, { ...newCohort, id: docRef.id }]);
      updateErrors({});

      newCohort.programDates = [];
      updateNewCohort(newCohort);
    } catch (err) {
      if (err instanceof ValidationError) {
        updateCreatingCohortStatus(false);
        // persist the newCohort data thus far so we don't lose it on the page update
        updateNewCohort(newCohort);

        // stanardize and shorten error message to use "field" as opposed the actual name
        const errorMessage = err.message.replace(/^".+"/, 'Field');
        updateErrors({ [err.details[0].path[0]]: errorMessage });
      }
    }
  };

  // create stubbed text fields for the different programs' dates
  const stubbedProgramDates = Object.values(programs).map((program) => {
    const capitalizedProgamTitle = `${program.title[0].toUpperCase()}${program.title.slice(
      1
    )}`;

    const programDates = newCohort.programDates.find(
      (date) => date.id === program.id
    );

    return (
      <Fragment key={program.title}>
        <div className='col'>
          <TextInput
            name={`${capitalizedProgamTitle}StartDate`}
            placeholder={`${capitalizedProgamTitle} Start Date`}
            value={programDates?.startDate.toDateString()}
            disabled
          />
        </div>
        <div className='col'>
          <TextInput
            name={`${capitalizedProgamTitle}EndDate`}
            placeholder={`${capitalizedProgamTitle} End Date`}
            value={programDates?.endDate.toDateString()}
            disabled
          />
        </div>
      </Fragment>
    );
  });

  return (
    <form css={formStyle} onSubmit={addNewCohortHandler}>
      <section className='grid-area'>
        <div className='col'>
          <TextInput
            name='name'
            placeholder='Cohort Name'
            iconProps={{ title: 'cohorts' }}
            onChange={newCohortOnChangeHandler}
            error={errors['name']}
          />
        </div>
        <div className='col'>
          <TextInput
            name='startDate'
            type='date'
            placeholder='Cohort Start Date'
            onChange={newCohortOnChangeHandler}
            error={errors['startedAt']}
          />
        </div>

        {stubbedProgramDates}
      </section>
      <section className='row submit'>
        <Button disabled={isCreatingCohort}>
          {!isCreatingCohort ? 'Create Cohort' : 'Please Wait...'}
        </Button>
      </section>
    </form>
  );
};

const CohortsPage = () => {
  let existingCohorts: any[] = [];
  let [existingPrograms, updateExistingPrograms] = useState<any>({});
  let [cohorts, updateCohorts] = useState<Cohort[]>([]);
  const [isLoading, updateLoadingStatus] = useState(true);
  const [isCreatingCohort, updateCreatingCohortStatus] = useState(false);
  const [errors, updateErrors] = useState({
    name: '',
    startedAt: '',
    programDates: '',
  });
  const [newCohort, updateNewCohort] = useState({
    name: '',
    startDate: new Date('1970-01-01'),
    createdAt: new Date(),
    programDates: [],
    traineeCount: 0,
  });
  const { Modal, toggleModal } = useModal(
    'Create A New Cohort',
    'Trainees are grouped into cohorts. Create a new one to identify any group of trainees.',
    (injectedToggleModal: Function) =>
      getModalContent(
        cohorts,
        existingPrograms,
        updateCohorts,
        errors,
        updateErrors,
        newCohort,
        updateNewCohort,
        isCreatingCohort,
        updateCreatingCohortStatus,
        injectedToggleModal
      )
  );

  if (isLoading) {
    CohortModel.getAll()
      .then((cohortsCollectionSnapshot) => {
        cohortsCollectionSnapshot.forEach((cohort) => {
          existingCohorts = [...existingCohorts, cohort.data()];

          // convert from Firestore TimeStamp type
          const currentCohort = existingCohorts[existingCohorts.length - 1];
          currentCohort.startDate = new Date(currentCohort.startDate.toDate());
          currentCohort.createdAt = new Date(currentCohort.createdAt.toDate());

          currentCohort.programDates = currentCohort.programDates.map(
            (programDate: any) => {
              return {
                ...programDate,
                startDate: programDate.startDate.toDate(),
                endDate: programDate.endDate.toDate(),
              };
            }
          );
        });

        return ProgramModel.getAll();
      })
      .then((programsCollectionSnapshot) => {
        programsCollectionSnapshot.forEach((program) => {
          existingPrograms[program.id] = { ...program.data(), id: program.id };
          existingPrograms[program.id].createdAt = new Date(
            existingPrograms[program.id].createdAt.toDate()
          );
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        updateLoadingStatus(false);
        updateCohorts(existingCohorts);
        updateExistingPrograms(existingPrograms);
      });

    return (
      <Fragment>
        <div className='empty-state'>
          <Loading />
        </div>
      </Fragment>
    );
  }

  if (cohorts.length === 0 && !isLoading) {
    return (
      <Fragment>
        <div className='empty-state'>
          <Icon
            width={55}
            height={50}
            viewBox={{ width: 35, height: 40 }}
            fill={theme['primary-500']}
            name='programs'
          />
          <h4 className='title'>There are no available cohorts</h4>
          <p className='desc'>Go ahead, create one!</p>
          <Button onClick={toggleModal}>Create A New Cohort</Button>
        </div>

        {/* Modal Content */}
        {Modal}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div css={cohortPageStyle}>
        <div className='toolbar'>
          <Button onClick={toggleModal}>Create A New Cohort</Button>
        </div>

        <div className='cohorts'>
          {cohorts.map((cohort) => (
            <div className='program' key={cohort.name}>
              <CohortCard
                traineeCount={cohort.traineeCount}
                title={cohort.name}
                currentProgram={
                  existingPrograms[cohort.programDates[0].id].title
                }
                /* TODO: Check for the accurate current program */

                currentProgramStartDate={cohort.programDates[0].startDate.toLocaleDateString()}
                currentProgramEndDate={cohort.programDates[0].endDate.toLocaleDateString()}
                startDate={cohort.startDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Content */}
      {Modal}
    </Fragment>
  );
};

export default CohortsPage;
