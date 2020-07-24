/** @jsx jsx */
import { FC, ReactElement, Fragment, useState } from 'react';
import { css, jsx } from '@emotion/core';
import { useLocation } from 'react-router-dom';

import theme, { remCalc } from '../../themes';
import Icon from '../Icon/Icon';
import Modal from '../Modal/Modal';
import Nav from '../Nav/Nav';
import themes from '../../themes';

type LayoutProps = {
  /**
   * Page to render, leveraging the Layout's render prop strategy
   */
  render: (
    toggleModal: () => void,
    setModalContent: (title: any, description: any, content: any) => void
  ) => ReactElement;
};

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

const Layout: FC<LayoutProps> = ({ render }) => {
  const currentLocation = useLocation();
  const [state, setState] = useState({
    isModalToggledOn: false,
    modalContent: { title: '', description: '', content: <div></div> },
  });

  /**
   * Helper methods
   */
  const pageTitle = (() => {
    const routeSections = currentLocation.pathname.split('/');
    // the first route section determines the page title  and icon
    return routeSections[1];
  })();

  const toggleModal = () => {
    setState({
      ...state,
      isModalToggledOn: !state.isModalToggledOn,
    });
  };

  const setModalContent = (
    title: string,
    description: string,
    content: ReactElement
  ) => {
    // setState({
    //   ...state,
    //   isModalToggledOn: !state.isModalToggledOn,
    //   modalContent: { title, description, content },
    // });
  };

  return (
    <Fragment>
      <div css={layoutStyle}>
        <Nav />
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
          {render(toggleModal, setModalContent)}
        </div>
      </div>
      {state.isModalToggledOn && (
        <Modal content={<button onClick={toggleModal}>Toggle</button>} />
      )}
    </Fragment>
  );
};

export default Layout;
