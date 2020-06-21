import React from 'react';
import { css, jsx } from '@emotion/core';
import logo from '../../assets/pulse_logo.svg';
import googleIcon from '../../assets/google-icon.png';
import dashboardSVG from '../../assets/dashboard.svg';
import humansSVG from '../../assets/humans.svg';
import lightsSVG from '../../assets/lights.svg';
import clockSVG from '../../assets/clock.svg';
import { Link } from 'react-router-dom';
/** @jsx jsx */

const homeStyle = css`
  display: grid;
  grid-template-columns: 2fr 5fr;
  height: 100vh;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const sideNavStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--primary-500);
  width: 100%;
  padding: 20px;
  height: 100vh;

  .logo {
    height: 15vh;
    text-align: center;
    color: var(--neutral-100);
    margin: 10% 0;
  }

  .logo > h2 {
    font-size: 1.4rem;
    font-weight: normal;
    margin-top: 10px;
  }

  .logo > img {
    width: 75%;
    margin-bottom: 10px;
  }
`;

const loginForm = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 95%;

  div {
    display: flex;
    width: 100%;
  }

  .loginForm__email {
    margin: 0.8rem 0;
  }

  .loginForm__password {
    margin: 0.8rem 0;
  }

  .loginForm__forgot {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0.4rem;
    color: var(--neutral-100);
  }

  .loginForm__forgot a {
    font-size: 0.8rem;
    padding: 0 0.4rem;
  }

  .loginForm__forgot a:hover {
    text-decoration: underline;
  }

  input[type='submit'] {
    background-color: var(--primary-400);
    color: var(--neutral-100);
    font-size: 1em;
    font-weight: 500;
    margin: 0.8rem 0;
  }

  input,
  .btn-google-signin {
    width: 100%;
    padding: 0 0.8rem;
    border-radius: 2px;
    border: none;
    outline: none;
    height: 3rem;
    max-height: 10rem;
    font-size: 1em;
    line-height: 1em;
  }

  .btn-google-signin {
    position: relative;
    display: flex;
    color: var(--primary-400);
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .btn-google-signin > img {
    position: absolute;
    left: 5%;
    width: 7%;
  }

  .btn-google-signin > h5 {
    font-size: 1em;
    font-weight: 500;
  }

  input[type='submit']:hover,
  button:hover {
    box-shadow: 0px 4px 8px -7px rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }

  .divder {
    display: flex;
    color: var(--neutral-100);
    width: 100%;
    align-items: center;
    margin: 1.5rem 0;
    opacity: 0.3;
  }

  .divder > h5 {
    font-size: 1em;
    font-weight: 500;
    margin: 0.3rem;
  }

  .divder > span {
    border-bottom: 1px solid var(--neutral-100);
    align-self: center;
    width: 49%;
    opacity: 0.5;
  }
`;

const showcaseStyle = css`
  display: grid;
  grid-template-areas:
    'lights-svg lights-svg  lights-svg lights-svg clock-svg clock-svg '
    'humans-svg humans-svg  dashboard-svg dashboard-svg  dashboard-svg  dashboard-svg ';
  grid-template-rows: 1fr 3fr;
  background: linear-gradient(to right, var(--primary-500), var(--primary-300));
  justify-items: center;
  align-items: center;
  height: 100vh;

  .lights-svg {
    grid-area: lights-svg;
    justify-self: center;
    align-self: start;
    width: 16%;
  }

  .lights-svg img {
    width: 100%;
  }

  .clock-svg {
    grid-area: clock-svg;
    justify-self: end;
    align-self: start;
    margin: 1.25rem;
    width: 40%;
  }

  .clock-svg img {
    width: 100%;
  }

  .humans-svg {
    grid-area: humans-svg;
    justify-self: end;
    align-self: center;
    width: 90%;
  }

  .humans-svg img {
    width: 100%;
  }

  .dashboard-svg {
    grid-area: dashboard-svg;
    justify-self: center;
    align-self: start;
    width: 85%;
  }

  .dashboard-svg img {
    width: 100%;
  }

  @media screen and (max-width: 960px) {
    display: grid;
    grid-template-areas:
      'lights-svg'
      'dashboard-svg';
    grid-template-rows: 1fr 3fr;
    justify-items: center;
    align-items: center;
    height: 100vh;

    .lights-svg {
      width: 27%;
    }

    .dashboard-svg {
      justify-self: end;
      align-self: start;
      width: 90%;
    }

    .humans-svg,
    .clock-svg {
      display: none;
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const Home = () => {
  return (
    <div className='home' css={homeStyle}>
      <div className='' css={sideNavStyle}>
        <div className='logo'>
          <img src={logo} alt='logo' />
          <h2> Welcome to Andela Pulse</h2>
        </div>
        <form className='loginForm' css={loginForm}>
          <div className='loginForm__email'>
            <input type='text' placeholder='Email' />
          </div>
          <div className='loginForm__password'>
            <input type='text' placeholder='Password' />
          </div>
          <div className='loginForm__forgot'>
            <Link to=''>Forgot Password?</Link>
          </div>
          <div>
            <input type='submit' value='Login' />
          </div>
          <div className='divder'>
            <span></span>
            <h5>OR</h5>
            <span></span>
          </div>
          <div>
            <button className='btn-google-signin' type='button'>
              <img src={googleIcon} alt='googleIcon' />
              <h5>Login With Google</h5>
            </button>
          </div>
        </form>
      </div>
      <div className='showcase' css={showcaseStyle}>
        <div className='lights-svg'>
          <img src={lightsSVG} alt='dashboard' />
        </div>
        <div className='clock-svg'>
          <img src={clockSVG} alt='dashboard' />
        </div>
        <div className='humans-svg'>
          <img src={humansSVG} alt='dashboard' />
        </div>
        <div className='dashboard-svg'>
          <img src={dashboardSVG} alt='dashboard' />
        </div>
      </div>
    </div>
  );
};

export default Home;
