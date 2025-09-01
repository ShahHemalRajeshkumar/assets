import React from 'react';

import SearchResultsItem from './SearchResultsItem';
import styles from '../../../styles/jobs-page-components.module.scss';

const SearchResults = ({ results }) => (
  <div className="contain">
    <div className={`${styles['job-list']}`}>
      {results.map((jobOffer, idx) => (
        <SearchResultsItem key={idx} jobOffer={jobOffer} />
      ))}
    </div>
  </div>
);

export default SearchResults;
