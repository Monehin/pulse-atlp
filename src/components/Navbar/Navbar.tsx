import React from 'react';
import { css, jsx } from '@emotion/core';
import { auth } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** @jsx jsx */

const Navigation = () => {
  return (
    <div className='navBar' css={navBarStyle}>
      <button onClick={() => auth.signOut()}>Logout</button>
      <div className='profileBox'>
        <FontAwesomeIcon
          className='fontIcon'
          icon={['fas', 'user']}
          size='lg'
        />
      </div>
    </div>
  );
};

const navBarStyle = css`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;

  .profileBox {
    display: flex;
    border-radius: 50%;
    background-color: rgb(188, 161, 223);
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 3px solid var(--neutral-300);
    cursor: pointer;
  }

  .profileBox .fontIcon {
    color: var(--neutral-100);
    font-size: 1.3em;
  }
`;

export default Navigation;
