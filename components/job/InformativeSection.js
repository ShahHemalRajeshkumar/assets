import React from 'react';
import HTMLReactParser from 'html-react-parser';

const InformativeSection = ({ title = '', description = '', wrapperClasses }) => (
  <section className={wrapperClasses}>
    <header className='text-center'>
      <h2 className='font-bold text-24px md:text-48px'>{title}</h2>
    </header>
    <div className='horisontal-line border-b-4 border-primary my-2 w-24 mx-auto' />
    <p className='md:mt-6'>{(description && HTMLReactParser(description)) || ''}</p>
  </section>
);

export default InformativeSection;
