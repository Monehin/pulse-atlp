/** @jsx jsx */
import { Fragment } from 'react';
import { css, jsx } from '@emotion/core';
import { useLocation, Route, Redirect, Switch } from 'react-router-dom';

// pages
import DashboardPage from '../../pages/Dashboard/Dashboard';
import CohortsPage from '../../pages/Cohorts/Cohorts';
import ProgramsPage from '../../pages/Programs/Programs';
import UsersPage from '../../pages/Users/Users';
import SettingsPage from '../../pages/Settings/Settings';

import theme, { remCalc } from '../../themes';
import Icon from '../Icon/Icon';
import Nav from '../Nav/Nav';
import themes from '../../themes';

/**
 * Style Definitions
 */
const layoutStyle = css`
  display: flex;
  width: 100vw;
  height: 100vh;

  .content-area {
    background-color: ${theme['primary-75']};
    height: inherit;
    flex: 1;
    padding: ${remCalc(30)};

    .empty-state {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 60%;
      text-align: center;

      .title,
      .desc {
        text-transform: capitalize;
      }

      .title {
        font-size: ${theme.h4};
        font-weight: bold;
        color: ${themes['primary-500']};
        margin: ${remCalc(20)} 0 ${remCalc(10)} 0;
      }

      .desc {
        font-size: ${theme.paragraph};
        color: ${themes['neutral-400']};
        margin-bottom: ${remCalc(40)};
      }
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      margin-bottom: ${remCalc(75)};

      .title {
        display: flex;
        align-items: center;
        margin-top: 0;
        margin-bottom: 1rem;
        color: ${theme['neutral-500']};
        line-height: 0;

        .header {
          font-size: ${theme.h3};
          font-weight: bold;
          text-transform: capitalize;
        }
      }

      .crumb {
        text-transform: uppercase;
        font-weight: 300;
        font-size: ${theme.helper};
      }

      .profile {
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${remCalc(40)};
        height: ${remCalc(40)};
        border-radius: 100%;
        border: 1px solid ${theme['neutral-350']};

        .pic {
          content: ' ';
          display: block;
          background: url('https://img.icons8.com/color/48/000000/circled-user-male-skin-type-6.png');
          background-size: contain;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: inherit;
        }
      }
    }
  }
`;

const Layout = () => {
  const currentLocation = useLocation();

  if (currentLocation.pathname === '/') {
    return <Redirect to='/dashboard' />;
  }

  /**
   * Helper methods
   */
  const pageTitle = (() => {
    const routeSections = currentLocation.pathname.split('/');
    // the first route section determines the page title  and icon
    return routeSections[1];
  })();

  return (
    <Fragment>
      <div css={layoutStyle}>
        <Nav />

        {/* Main content section */}
        <div className='content-area'>
          <section className='top-bar'>
            <div className='page-title'>
              <div className='title'>
                <Icon
                  name={pageTitle}
                  width={35}
                  height={30}
                  fill={theme['neutral-500']}
                />
                <h3 className='header'>{pageTitle}</h3>
              </div>
              <div className='breadcrumbs'>
                <small className='crumb'>Reports</small>
              </div>
            </div>

            <div className='profile'>
              <span className='pic'></span>
            </div>
          </section>
          <Switch>
            <Route path='/dashboard'>
              <DashboardPage />
            </Route>

            <Route path='/cohorts'>
              <CohortsPage />
            </Route>

            <Route path='/programs'>
              <ProgramsPage />
            </Route>

            <Route path='/users'>
              <UsersPage />
            </Route>

            <Route path='/settings'>
              <SettingsPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
