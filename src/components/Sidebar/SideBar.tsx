import React from 'react';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo_SM from '../../assets/pulse_logo.svg';
/** @jsx jsx */

const sideBarStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--primary-500);
  font-size: 1rem;

  .pulseLogo {
    display: flex;
    justify-content: center;
    height: 20vh;
  }

  .pulseLogo > img {
    width: 50%;
  }

  .fontIcon {
    margin-right: 25px;
  }

  .menuItems ul li {
    font-weight: 600;
    padding: 1.3rem;
    transition: all ease-in 0.2s;
    text-decoration: none;
    text-decoration-style: none;
    font-weight: 600;
    transition: all ease-in 0.2s;
    color: var(--neutral-100);
  }

  .menuItems ul li a {
    text-decoration: none;
  }

  .menuItems ul .active,
  .menuItems ul li:hover {
    background-color: var(--primary-300);
    border-left: 5px var(--secondary-500) solid;
    font-weight: bold;
  }
  .menuItems ul .active .fontIcon,
  .menuItems ul li:hover .fontIcon {
    color: var(--secondary-500);
  }
`;

const SideBar = () => {
  return (
    <div className='sideBar' css={sideBarStyle}>
      <div className='pulseLogo flex justify-center p-5'>
        <img className='' src={Logo_SM} alt='track logo' />
      </div>
      <div className='menuItems'>
        <ul className=''>
          <li className='active'>
            <FontAwesomeIcon
              className='fontIcon'
              icon={['fas', 'chart-bar']}
              size='lg'
            />
            <Link to='/dashboard'>Reports</Link>
          </li>
          <li className=''>
            <FontAwesomeIcon
              className='fontIcon'
              icon={['fas', 'graduation-cap']}
              size='lg'
            />
            <Link to='/dashboard'>Cohorts</Link>
          </li>
          <li className=''>
            <FontAwesomeIcon
              className='fontIcon'
              icon={['fas', 'laptop-code']}
              size='lg'
            />
            <Link to='/dashboard'>Programs</Link>
          </li>
          <li className=''>
            <FontAwesomeIcon
              className='fontIcon'
              icon={['fas', 'users-cog']}
              size='lg'
            />
            <Link to='/dashboard'>Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
