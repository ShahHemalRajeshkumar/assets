import React from 'react';
import LinkRoute from '../../../../../utils/link-route';

const FooterListItem = ({ link }) => {
  const { open, name } = link;

  return (
    <li className='text-black opacity-60 cursor-pointer flex flex-col items-left sublinks mb-4'>
      <a
        className='hover:opacity-100 hover:text-primary rounded outline-visible'
        href={LinkRoute(link)}
        target={open ? '_blank' : '_self'}
        rel='noreferrer'>
        {name}
      </a>
    </li>
  );
};

export default FooterListItem;
