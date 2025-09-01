import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Typeahead } from 'react-bootstrap-typeahead';
import { isEmpty } from 'ramda';
import dynamic from 'next/dynamic';
import axios from 'axios';

import styles from '@/styles/jobs-page-components.module.scss';
import Spinner from '@/components/Spinner';
import SearchResults from '@/components/jobs/Search/SearchResults';
import Pagination from '@/components/jobs/Pagination';
import FilterList from '../../icons/FilterList.svg';

const DownArrow = dynamic(() => import('../../icons/DownArrow'));
const Instrument = dynamic(() => import('../../icons/Instrument'));
const Location = dynamic(() => import('../../icons/Location'));

const FILTER_TYPES = {
  INSTRUMENT: 'instrument_name',
  LOCA: 'location_locality',
};

const makeUnique = (arr) => [...new Set(arr)];

const getElementByFilter = (allJobOffers, selected, elementToExtract) => {
  if (selected.length === 0) return makeUnique(allJobOffers.map((el) => el[elementToExtract]));

  const filteredResults = allJobOffers.filter((jobOffer) => {
    const value = elementToExtract === FILTER_TYPES.INSTRUMENT ? FILTER_TYPES.LOCA : FILTER_TYPES.INSTRUMENT;
    return jobOffer[value] === selected[0];
  });

  const resultsNames = makeUnique(filteredResults.map((res) => res[elementToExtract]));

  return resultsNames;
};

const formatParameter = (parameter) => encodeURI(parameter.toLowerCase().trim());

const Search = ({ currentPage, numPages, allJobOffers, language }) => {
  const [selectedInstrument, setSelectedInstrument] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(numPages);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isEnglishPage = language === 'ch-en';

  const filters = {
    instrument: selectedInstrument[0] || '',
    locality: selectedLocality[0] || '',
  };

  const getJobOffers = async (filters = {}) => {
    const { instrument, locality } = filters;
    try {
      setLoading(true);
      const { data } = await axios(
        `/api/search?instrument=${instrument.toLowerCase()}&locality=${locality.toLowerCase()}&language=${
          isEnglishPage ? 'en' : 'de'
        }&currentPage=${currentPage}&numPages=${numPages}`
      );
      const { results, numPages, instrumentNames } = JSON.parse(data);

      setNumberOfPages(numPages);
      setSearchResults(results);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobOffers(filters);
  }, []);

  useEffect(() => {
    getJobOffers(filters);
  }, [selectedInstrument, selectedLocality, currentPage]);

  const handleFilterChange = (selected, filterType) => {
    setLoading(true);
    if (currentPage > 1) router.push(`/${language}/jobs`);
    if (filterType === FILTER_TYPES.INSTRUMENT) setSelectedInstrument(selected);
    if (filterType === FILTER_TYPES.LOCA) setSelectedLocality(selected);
  };

  return (
    <>
      <form className={`${styles['search-jobs-form']} search-jobs contain py-12`}>
        <div className={`${styles['filter-icon']} flex items-center text-24px`}>
          <FilterList />
          {isEnglishPage ? 'Filter jobs:' : 'Stellenangebote filtern:'}
        </div>
        <div className='relative'>
          <Typeahead
            id='instrument'
            inputProps={{
              'aria-label': 'Enter search text form instrument',
            }}
            placeholder={isEnglishPage ? 'Search instrument' : 'Instrument suchen'}
            labelKey={FILTER_TYPES.INSTRUMENT}
            className={`${styles['input-field-wrapper']} search-job-field`}
            onChange={(selected) => handleFilterChange(selected, FILTER_TYPES.INSTRUMENT)}
            options={getElementByFilter(allJobOffers, selectedLocality, FILTER_TYPES.INSTRUMENT)}
          />
          <Instrument />
        </div>
        <div className='relative'>
          <Typeahead
            id='location'
            inputProps={{
              'aria-label': 'Enter search text form location',
            }}
            placeholder={isEnglishPage ? 'Search location' : 'Ort eingeben'}
            labelKey='locality'
            className={`${styles['input-field-wrapper']} search-job-field`}
            onChange={(selected) => handleFilterChange(selected, FILTER_TYPES.LOCA)}
            options={getElementByFilter(allJobOffers, selectedInstrument, FILTER_TYPES.LOCA)}
          />
          <Location />
        </div>
      </form>
      {error && (
        <div className='contain'>
          {isEnglishPage
            ? 'Something went wrong while fetching data. Please try again later.'
            : 'Beim Abrufen der Daten ist etwas schief gelaufen. Bitte versuchen Sie es später erneut.'}
        </div>
      )}
      {loading && (
        <div className='contain'>
          <Spinner />
        </div>
      )}
      {!loading && !error && !isEmpty(searchResults) && (
        <>
          <SearchResults results={searchResults} />
          <Pagination currentPage={currentPage} numPages={numberOfPages} language={language} />
        </>
      )}
    </>
  );
};

export default Search;
