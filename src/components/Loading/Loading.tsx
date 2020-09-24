/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Loading = () => {
  return (
    <div css={loadingStyle}>
      <div className='obj'></div>
      <div className='obj'></div>
      <div className='obj'></div>
      <div className='obj'></div>
      <div className='obj'></div>
      <div className='obj'></div>
      <div className='obj'></div>
      <div className='obj'></div>
      <div className='obj'></div>
    </div>
  );
};

const loadingStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  display: flex;
  align-items: center;

  .obj {
    width: 5px;
    height: 30px;
    margin: 0 3px;
    background: var(--primary-500);
    border-radius: 10px;
    animation: loading 0.8s infinite;
  }

  .obj:nth-of-type(2) {
    animation-delay: 0.1s;
  }
  .obj:nth-of-type(3) {
    animation-delay: 0.4s;
  }
  .obj:nth-of-type(3) {
    animation-delay: 0.7s;
  }
  .obj:nth-of-type(5) {
    animation-delay: 0.1s;
  }
  .obj:nth-of-type(6) {
    animation-delay: 0.14s;
  }
  .obj:nth-of-type(7) {
    animation-delay: 0.6s;
  }
  .obj:nth-of-type(8) {
    animation-delay: 0.7s;
  }

  @keyframes loading {
    0% {
      height: 0;
    }
    50% {
      height: 40px;
    }
    0% {
      height: 0px;
    }
  }
`;

export default Loading;
