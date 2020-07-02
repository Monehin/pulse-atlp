import React, { useContext } from 'react';
import { css, jsx } from '@emotion/core';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../Providers/UserProvider';
import SideBar from '../Sidebar/SideBar';
import Navbar from '../Navbar/Navbar';
import Reports from '../Reports/Reports';
/** @jsx jsx */

const dashboardStyle = css`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr;
  height: 100vh;

  .sideBar {
    height: 100%;
  }

  .mainContent {
    background-color: #f5f8ff;
    padding: 0 25px;
    height: 100vh;
    overflow-y: scroll;
  }
`;

const Dashboard = () => {
  return (
    <div className='dashboard' css={dashboardStyle}>
      <aside className='sideBar'>
        <SideBar />
      </aside>
      <section className='mainContent'>
        <Navbar />
        <Reports />
      </section>
    </div>
  );
};

export default Dashboard;
