/** @jsx jsx */
import { FC, Fragment, cloneElement, ReactElement, useState } from "react";
import { css, jsx } from "@emotion/core";

import theme, { remCalc } from "../../themes";

type TabProps = {
  /**
   * This is displayed as the title of the tab and is also
   * used to uniquely identify the tab
   */
  id: string;
  isActive?: boolean;
  onClick?: () => void;
  /**
   * Content that'll show up when you click this tab.
   * It can be any valid JSX. See TabGroup for usage.
   */
  tabContent: ReactElement;
};

type TabGroupProps = {
  /**
   * The ID of the tab will be injected into the handler
   */
  handler: (id: string) => void;
  children: ReactElement<TabProps>[];
};

/**
 * Style Declararations
 */
const TabStyle = css`
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  color: ${theme['neutral-350']};
  padding: ${remCalc(10)};
  border-bottom: 1px solid ${theme['neutral-350']};
  transition: all 150ms linear;

  &::before {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: transparent;
    width: 100%;
    height: 3px;
    border-radius: 3px;
    transition: all 150ms linear;
  }

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.active {
    font-weight: bold;
    color: ${theme['primary-500']};
    border: 0;

    &::before {
      background-color: ${theme['primary-500']};
      border-bottom: 1px solid ${theme['primary-500']};
    }
  }
`;

const TabGroupStyle = css`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const Tab: FC<TabProps> = ({
  isActive = false,
  id,
  onClick,
}) => (
  <span
    css={TabStyle}
    onClick={onClick}
    className={`tab ${isActive && "active"}`}
  >
    {id}
  </span>
);

export const TabGroup: FC<TabGroupProps> = ({
  handler,
  children: tabs,
}) => {
  const [activetabId, setActivetabId] = useState('');
  const isActivetab = (tabProps: TabProps): boolean => {
    if (tabProps.isActive && activetabId === '') {
      // user has most likely not clicked anything
      return true;
    }

    if (activetabId !== '') {
      return tabProps.id === activetabId;
    }

    return false;
  };

  /**
   * Returns a closure that has the right radio tab id prop enclosed in it's scope
   *
   * @param {TabProps} tabProps
   * @returns {void}
   */
  const onClickGenerator = (tabProps: TabProps) => () => {
    setActivetabId(tabProps.id);
    handler(tabProps.id);
  };

  /**
   * Extract active tab content
   *
   * @param {string} activeTabId
   * @returns {ReactElement}
   */
  const getActiveTabContent = (activetabId: string) => {
    let tabContent;
    const activeTab = tabs.filter(tab => tab.props.id === activetabId)[0];

    if (activeTab) {
      tabContent = activeTab.props.tabContent;
    } else {
      tabContent = tabs[0].props.tabContent;
    }

    return tabContent;
  }

  return (
    <Fragment>
      {/** Actual tabs */}
      <section
        css={TabGroupStyle}>
        {tabs.map(tab =>
          cloneElement(tab, {
            onClick: onClickGenerator(tab.props),
            isActive: isActivetab(tab.props),
            key: tab.props.id
          })
        )}
      </section>
      
      { /** Tab Content */ }
      <section>
        {cloneElement(getActiveTabContent(activetabId))}
      </section>
    </Fragment>
  );
};

export default Tab;
