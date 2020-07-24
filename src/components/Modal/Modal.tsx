/** @jsx jsx */
import { FC, ReactElement } from 'react';
import { css, jsx } from '@emotion/core';

import theme, { remCalc } from '../../themes';

type ModalProps = {
  title?: string;
  description?: string;
  content?: ReactElement<HTMLElement>;
};

/**
 * Style Definitions
 */
const modalStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100vw;
  height: 100vh;

  .modal-content {
    background-color: ${theme['neutral-100']};
    width: 51%;
    padding: ${remCalc(40)};
    border-radius: 5px;

    .title-desc {
      margin-bottom: ${remCalc(40)};
      color: ${theme['neutral-500']};
    }

    .title {
      font-size: ${theme.h3};
      font-weight: bold;
      margin-bottom: ${remCalc(10)};
    }

    .desc {
      font-weight: 300;
    }
  }
`;

const Modal: FC<ModalProps> = ({
  title = 'Modal Title',
  description = 'Modal Content Descrtiption',
  content = <div>Default content</div>,
}) => {
  return (
    <div className='modal-bg' css={modalStyle}>
      <div className='modal-content'>
        {/** Title */}
        <section className='title-desc'>
          <h3 className='title'>{title}</h3>
          <p className='desc'>{description}</p>
        </section>

        {/** Content */}
        <section>{content}</section>
      </div>
    </div>
  );
};

export default Modal;
