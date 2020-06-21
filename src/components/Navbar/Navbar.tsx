import React from 'react';
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** @jsx jsx */

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
    width: 40px;
    height: 40px;
  }

  .profileBox .fontIcon {
    color: var(--neutral-100);
  }
`;

const Navigation = () => {
  return (
    <div className='navBar' css={navBarStyle}>
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

export default Navigation;
