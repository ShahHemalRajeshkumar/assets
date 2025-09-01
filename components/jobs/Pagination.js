/* eslint-disable react/jsx-key */
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from '../../styles/jobs-page-components.module.scss';

const ArrowLeft = dynamic(() => import('../icons/ArrowLeft'));

const Pagination = ({ currentPage, numPages, language }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/${language}/jobs/page/${currentPage - 1}`;
  const nextPage = `/${language}/jobs/page/${currentPage + 1}`;
  if (numPages === 1) return <></>;

  return (
    <div className="contain pt-12 ">
      <ul className="flex items-center justify-center my-2 text-22px gap-x-4">
        {!isFirst && (
          <Link href={prevPage}>
            <a>
              <li>
                <ArrowLeft />
              </li>
            </a>
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) =>
          <Link key={i} href={`/${language}/jobs/page/${i + 1}`}>
            <a className={`${currentPage === i + 1 ? 'text-primary' : ''}`}>
              {i + 1}
            </a>
          </Link>

        )}

        {!isLast && (
          <Link href={nextPage}>
            <a className="transform rotate-180">
              <li className={`${styles['arrow-icon']}`}>
                <ArrowLeft />
              </li>
            </a>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
