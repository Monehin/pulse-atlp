/** @jsx jsx */

import { useContext, useState, SyntheticEvent } from 'react';
import { css, jsx } from '@emotion/core';
import { UserContext } from '../../Providers/UserProvider';
import { auth, signInWithGoogle } from '../../firebase';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';

// Import SVGs
import logo from '../../assets/pulse_logo.svg';
import googleIcon from '../../assets/google-icon.png';
import dashboardSVG from '../../assets/dashboard.svg';
import humansSVG from '../../assets/humans.svg';
import lightsSVG from '../../assets/lights.svg';
import clockSVG from '../../assets/clock.svg';
import themes, { remCalc } from '../../themes';
import Layout from '../../components/Layout/Layout';

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
  background: ${themes['primary-500']};
  width: 100%;
  height: 100%;
  padding: ${remCalc(20)} ${remCalc(20)} ${remCalc(20)} ${remCalc(40)};

  .logo {
    width: 100%;
    margin: 10% 0;
    color: ${themes['neutral-100']};

    > .title {
      font-size: ${themes.h2};
      font-weight: 300;
      &.bold {
        font-weight: bold;
      }
    }

    img {
      width: 45%;
      margin-bottom: ${remCalc(40)};
    }
  }
`;

const loginFormStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;

  div {
    display: flex;
    width: 100%;
  }

  .login-form__email {
    margin: 0.8rem 0;
  }

  .login-form__error {
    display: flex;
    background-color: ${themes['error-200']};
    color: ${themes['neutral-100']};
    border-radius: 0.2em;
    padding: 0.5rem;
    align-items: center;

    > .fontIcon {
      color: ${themes['neutral-200']};
      opacity: 0.5;
      margin-right: 0.5em;
    }
  }

  .login-form__password {
    margin: 0.8rem 0;
  }

  .login-form__forgot {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0.4rem;
    color: ${themes['neutral-100']};
    opacity: 0.6;

    a {
      font-size: ${themes.helper};
      padding: 0 0.4rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .submit-login-form {
    background-color: ${themes['primary-400']};
    color: ${themes['neutral-100']};
    font-size: 1em;
    font-weight: 500;
    margin: 0.8rem 0;
  }

  .submit-login-form,
  .btn-google-signin {
    box-shadow: 0px 2px 4px rgba(8, 35, 48, 0.4);
    transition: all 300ms ease-in;

    &:hover {
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
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
    color: ${themes['primary-400']};
    align-items: center;
    justify-content: center;
    font-weight: 700;

    > img {
      position: absolute;
      left: 5%;
      width: 7%;
    }

    > h5 {
      font-size: 1em;
      font-weight: 500;
    }
  }

  .divder {
    display: flex;
    color: ${themes['neutral-100']};
    width: 100%;
    align-items: center;
    margin: 1.5rem 0;
    opacity: 0.3;

    > h5 {
      font-size: 1em;
      font-weight: 500;
      margin: 0.3rem;
    }

    &::before,
    &::after {
      content: ' ';
      border-bottom: 1px solid ${themes['neutral-100']};
      align-self: center;
      width: 49%;
      opacity: 0.5;
    }
  }
`;

const showcaseStyle = css`
  display: grid;
  grid-template-areas:
    'lights-svg lights-svg lights-svg lights-svg clock-svg clock-svg '
    'humans-svg humans-svg dashboard-svg dashboard-svg dashboard-svg dashboard-svg';
  grid-template-rows: 1fr 3fr;
  background: linear-gradient(
    to right,
    ${themes['primary-500']},
    ${themes['primary-300']}
  );
  justify-items: center;
  align-items: center;
  height: 100%;

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

  @media screen and (max-width: ${remCalc(960)}) {
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

  @media (max-width: ${remCalc(600)}) {
    display: none;
  }
`;

const AuthPage = () => {
  const history = useHistory();
  const currentLocation = useLocation();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    loading: false,
    error: { code: '', message: '' },
  });

  const { email, password, error } = loginForm;
  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    return <Redirect to='dashboard' />;
  }

  if (currentLocation.pathname !== '/') {
    return <Redirect to='/' />;
  }

  const handleInputChange = (e: SyntheticEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    setLoginForm({
      ...loginForm,
      [name]: value,
      error: { code: '', message: '' },
    });
  };

  const handleLoginWithEmail = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoginForm({ ...loginForm, loading: true });
      await auth.signInWithEmailAndPassword(email, password);
      setLoginForm({ ...loginForm, email: '', password: '', loading: false });
      history.push('/dashboard');
    } catch (err) {
      const { code, message } = err;
      setLoginForm({ ...loginForm, error: { code, message } });
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      const { code, message } = err;
      setLoginForm({ ...loginForm, error: { code, message } });
    }
  };

  return !currentUser ? (
    <div css={homeStyle}>
      <div css={sideNavStyle}>
        <div className='logo'>
          <img src={logo} alt='logo' />
          <h2 className='title'>Performance</h2>
          <h2 className='title'>Management</h2>
          <h2 className='title bold'>Simplified</h2>
        </div>

        <form onSubmit={handleLoginWithEmail} css={loginFormStyle}>
          {error.code && (
            <div className='login-form__error'>
              &times;
              {error.message}
            </div>
          )}
          <div className='login-form__email'>
            <input
              name='email'
              type='text'
              placeholder='Email'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='login-form__password'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='login-form__forgot'>
            <Link to='/'>Forgot Password?</Link>
          </div>
          <input type='submit' value='Login' className='submit-login-form' />

          {/** Divider */}
          <div className='divder'>
            <h5>OR</h5>
          </div>
          {/** Divider */}

          <button
            className='btn-google-signin'
            type='button'
            onClick={handleSignInWithGoogle}
          >
            <img src={googleIcon} alt='googleIcon' />
            <h5>Login With Google</h5>
          </button>
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
  ) : (
    <Layout />
  );
};

export default AuthPage;
