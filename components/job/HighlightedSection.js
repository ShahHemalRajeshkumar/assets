import React from 'react';
import Styles from '@/styles/job-adpage-components.module.scss';
import DynamicComponent from '../DynamicComponent';
import { extractClassValues } from '../../utils/breakpoint';

const HighlightedSection = ({ wrapperClasses, title, blok }) => (
  <section className={wrapperClasses}>
    <h2 className={`${Styles['highlighted-heading']} px-4 leading-34px text-center font-bold  md:text-60px`}>
      {title && title}
      {blok && blok.text}
    </h2>
  </section>
);

export default HighlightedSection;
