import React, { useState } from 'react';
import StoryblokService from '../utils/storyblok-service';
import SearchListComponent from './SearchListComponent';
import Styles from '../styles/search.module.scss';

const SearchComponent = ({ handleSearch }) => {
  const url = handleSearch.url;

  const [searched, setSearchedValue] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultFlag, setSearchResultFlag] = useState(false);
  const onSearch = (event) => {
    if (event.key === 'Enter') {
      StoryblokService.get(`cdn/stories`, { search_term: event.target.value }).then((res) => {
        setSearchResults(res.data.stories);
        setSearchResultFlag(true);
      });
    }
  };
  const onSearchClick = () => {
    handleSearch(!searched);
    setSearchedValue(!searched);
    setSearchResultFlag(false);
  };

  return (
    <div>
      <div className='mr-4 relative'>
        <div onClick={onSearchClick} className='cursor-pointer focus:border'>
          {!searched && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          )}
        </div>
        {searched && (
          <div className='flex items-center z-10'>
            <input
              type='text'
              placeholder='Search'
              onKeyDown={onSearch}
              className={`${Styles['ms-search__input']} st-default-search-input px-3 py-1 relative bg-white rounded-lg text-14px shadow outline-none pr-10`}
            />
            <span className='z-10 text-silver-grey absolute right-4 pl-3 py-2' onClick={onSearchClick}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </span>
          </div>
        )}
      </div>
      <div className='absolute left-0 top-20 bg-white min-w-full'>
        {searchResultFlag && searched && searchResults.length ? (
          <SearchListComponent blok={searchResults} />
        ) : searchResultFlag && searched && !searchResults.length ? (
          <div className='contain my-4 md:my-20 h-screen w-full'>
            <p>No Search Results</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
