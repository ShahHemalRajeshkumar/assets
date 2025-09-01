import React from 'react';
import NavigationTopBarListItem from './NavigationTopBarListItem';

export const NavigationTopBarList = ({ headerContent, clickMenu, clickedHeader, language }) => {
  if (!headerContent.length) return null;

  return (
    <ul className='items-center hidden mt-5 ml-2 lg:flex'>
      {headerContent.slice(1).map((header) => (
        <NavigationTopBarListItem
          key={header._uid}
          header={header}
          clickMenu={clickMenu}
          clickedHeader={clickedHeader}
          language={language}
        />
      ))}
    </ul>
  );
};

export default NavigationTopBarList;
