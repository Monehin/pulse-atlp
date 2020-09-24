/** @jsx jsx */
import { useState, FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { css, jsx } from '@emotion/core';

import theme, { remCalc } from '../../themes';

export type ModalProps = {
  title: string;
  description: string;
  isModalVisible: Boolean;
  toggleModal: Function;
  renderContent: (toggleModal: Function) => ReactNode;
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

    .title-desc-group {
      display: flex;
      justify-content: space-between;
      margin-bottom: ${remCalc(40)};
      color: ${theme['neutral-500']};

      .title {
        font-size: ${theme.h4};
        font-weight: bold;
        margin-bottom: ${remCalc(10)};
      }

      .desc {
        font-weight: 300;
      }

      #close-modal {
        background-color: transparent;
        font-size: 2rem;
        height: 2rem;
        margin-top: -1rem;
        color: ${theme['neutral-300']};

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

/**
 * Modal Functional Component
 */
const Modal: FC<ModalProps> = ({ children, ...props }) => {
  const toggleModal = () => props.toggleModal();
  const modalBody = props.isModalVisible ? (
    <div className='modal-bg' css={modalStyle}>
      <div className='modal-content'>
        {/** Title */}
        <section className='title-desc-group'>
          <div className='title-desc'>
            <h3 className='title'>{props.title}</h3>
            <p className='desc'>{props.description}</p>
          </div>
          <button id='close-modal' onClick={toggleModal}>
            &times;
          </button>
        </section>

        {/** Content */}
        <section>{props.renderContent(props.toggleModal)}</section>
      </div>
    </div>
  ) : null;

  return createPortal(
    modalBody,
    document.querySelector('#modal-container') as HTMLElement
  );
};

/**
 * Custom Modal hook
 *
 * @param {string} title
 * @param {string} description
 * @param {Function} renderContent
 */
const useModal = (
  title: string,
  description: string,
  renderContent: (toggleModal: Function) => ReactNode
) => {
  const [isModalVisible, updateModalState] = useState(false);
  const toggleModal = () => updateModalState(!isModalVisible);

  return {
    toggleModal,
    Modal: (
      <Modal
        title={title}
        description={description}
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        renderContent={renderContent}
      />
    ),
  };
};

export default useModal;
