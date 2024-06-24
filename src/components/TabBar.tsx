'use client';

import { useState } from 'react';

import classNames from 'classnames';

/**
 * Props for the TabBar component.
 *
 * @typedef {Object} TabBarProps
 * @property {string[]} tabBarList - List of tab names. ex) ['여행 후기', '여행 계획']
 * @property {function(string): void} handleTabBarClick - Function to handle tab click events. ex) const handleTabBarClick = (tabName) => { setRenderComponent(tabName);}
 * @property {'S' | 'M' | 'L' | 'vertical_M' | 'vertical_L'} size - Size of the tab bar. 세로 정렬일 경우 vertical 사용
 */

/**
 * TabBar component renders a list of tabs.
 *
 * @param {TabBarProps} props - The props for the TabBar component.
 * @returns {JSX.Element} The rendered TabBar component.
 */

interface TabBarProps {
  tabBarList: string[];
  handleTabBarClick: (item: string) => void;
  size: 'S' | 'M' | 'L' | 'vertical_M' | 'vertical_L';
}

export default function TabBar({ tabBarList, handleTabBarClick, size }: TabBarProps) {
  const [clickedTab, setClickedTab] = useState<string>(tabBarList[0]);

  const tabBarCss = {
    L: {
      ulClassName: 'tab-bar-ul',
      liClassName: 'tab-bar-li',
      hrClassName: 'tab-bar-hr'
    },
    M: {
      ulClassName: 'tab-bar-ul',
      liClassName: 'tab-bar-li',
      hrClassName: 'tab-bar-hr'
    },
    S: {
      ulClassName: 'justify-start flex gap-16',
      liClassName: 'flex flex-col gap-2 w-max',
      hrClassName: 'tab-bar-hr'
    },
    vertical_M: {
      ulClassName: 'flex flex-col gap-2',
      liClassName: 'tab-bar-li-vertical-M',
      hrClassName: 'tab-bar-hr-vertical'
    },
    vertical_L: {
      ulClassName: 'flex flex-col gap-3',
      liClassName: 'tab-bar-li-vertical-L',
      hrClassName: 'tab-bar-hr-vertical'
    }
  };

  return (
    <nav>
      <ul className={tabBarCss[size].ulClassName}>
        {tabBarList.map((item, index) => {
          const className = classNames('tab-bar-button', {
            'tab-bar-button-active': clickedTab === item
          });

          const hrClassName = classNames(
            {
              'tab-bar-hr-active': clickedTab === item
            },
            tabBarCss[size].hrClassName
          );

          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className={tabBarCss[size].liClassName}>
              <button
                className={className}
                type="button"
                onClick={() => {
                  handleTabBarClick(item);
                  setClickedTab(item);
                }}
              >
                {item}
              </button>
              <hr className={hrClassName} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
