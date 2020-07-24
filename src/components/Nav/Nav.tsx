/** @jsx jsx */
import { FC, createElement } from 'react';
import { css, jsx } from '@emotion/core';
import { NavLink, useLocation } from 'react-router-dom';

import theme, { remCalc } from '../../themes';
import Icon from '../Icon/Icon';

type MenuItemProps = {
  title: string;
  icon: {
    width: number;
    height: number;
    viewBox: { width: number; height: number };
  };
  route: string;
};

type NavProps = {
  /**
   * List of menu items that the current logged in user is not
   * privileged to see
   */
  unauthorizedMenuItems?: string[];
};

const navBarStyle = css`
  position: relative;
  background-color: ${theme['primary-500']};
  width: 19rem;
  height: 100vh;
  justify-content: flex-end;

  .logo {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: ${remCalc(60)} 0 0 2rem;
    margin-bottom: 3rem;
  }

  .bottom-art {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 15rem;

    .graphic {
      position: absolute;
      bottom: ${remCalc(-20)};
      left: 0;
    }

    .copyright {
      position: absolute;
      bottom: 1.5rem;
      width: 100%;
      font-size: ${theme.small};
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      color: ${theme['primary-500']};
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0), 0 0 0 black;

      small:first-of-type {
        margin-right: 0.2rem;
      }

      small:last-of-type {
        margin-left: 0.2rem;
      }
    }
  }
`;

const menuItemStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 2rem;
  margin-bottom: 1rem;
  transition: background-color 300ms linear;

  .icon {
    display: inline-block;
    margin-right: ${remCalc(20)};
    line-height: 0;
  }

  .title {
    display: inline-block;
    font-size: ${theme.h5};
    font-weight: bold;
    color: ${theme['primary-150']};
    line-height: 0;
  }

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.05);
  }

  &.active {
    &:hover {
      background-color: transparent;
    }

    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      background-color: ${theme['secondary-500']};
      width: 0.4rem;
      height: 100%;
    }

    .title,
    .icon {
      color: ${theme['neutral-100']};
    }
  }
`;

export const MenuItem: FC<MenuItemProps> = ({ route, icon, title }) => {
  const currentLocation = useLocation();
  const isActive = currentLocation.pathname.includes(route);
  const fill = isActive ? theme['neutral-100'] : theme['primary-125'];

  return (
    <NavLink to={route} css={menuItemStyle} activeClassName='active'>
      <span className='icon'>
        <Icon
          name={title.toLocaleLowerCase()}
          width={icon.width}
          height={icon.height}
          viewBox={icon.viewBox}
          fill={fill}
        />
      </span>
      <span className='title'>{title}</span>
    </NavLink>
  );
};

const Nav: FC<NavProps> = ({ unauthorizedMenuItems = [] }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: { width: 21, height: 21, viewBox: { width: 28, height: 24 } },
    },
    {
      title: 'Cohorts',
      route: '/cohorts',
      icon: { width: 22.5, height: 22.5, viewBox: { width: 30, height: 30 } },
    },
    {
      title: 'Programs',
      route: '/programs',
      icon: { width: 21, height: 28, viewBox: { width: 28, height: 34 } },
    },
    {
      title: 'Users',
      route: '/users',
      icon: { width: 25, height: 17, viewBox: { width: 35, height: 21 } },
    },
    {
      title: 'Settings',
      route: '/settings',
      icon: { width: 22.5, height: 22.5, viewBox: { width: 30, height: 30 } },
    },
  ];

  /**
   * Only show menu items that are authorized for this user.
   * Also update the onClick to allow the clicked menu item's state
   * be updated in realtime.
   *
   * @param {string[]} unauthorizedMenuItems
   */
  const showAllowedMenuItems = (unauthorizedMenuItems: string[]) => {
    const allowedMenuItems = menuItems.filter(
      (menuItem) =>
        !unauthorizedMenuItems.includes(menuItem.title.toLocaleLowerCase())
    );

    // update onClick
    return allowedMenuItems.map((menuItem) =>
      createElement(MenuItem, {
        title: menuItem.title,
        icon: menuItem.icon,
        key: menuItem.title.toLocaleLowerCase(),
        route: menuItem.route,
      })
    );
  };

  return (
    <div className='nav' css={navBarStyle}>
      {/** Logo Section */}
      <section className='logo'>
        <Icon
          name='logo'
          width={140}
          height={45}
          viewBox={{ width: 180, height: 45 }}
        />
      </section>

      {showAllowedMenuItems(unauthorizedMenuItems)}

      <section className='bottom-art'>
        <span className='graphic'>
          <Icon name='navArt' />
        </span>
        <span className='copyright'>
          <small>made with</small>
          <Icon name='heart' />
          <small>@Andela</small>
        </span>
      </section>
    </div>
  );
};

export default Nav;
