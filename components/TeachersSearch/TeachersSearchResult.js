import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { translateENtoDE } from 'functions/translator';

const CardComponent = dynamic(() => import('./CardComponent'));
const TeachersCounter = dynamic(() => import('./TeachersCounter'));
const OurOffersComponent = dynamic(() => import('./OurOffersComponent'));
const InstrumentSeoComponent = dynamic(() => import('./InstrumentSeoComponent'));
const InstrumentLocationList = dynamic(() => import('./InstrumentLocationList'));
const ResultsSummary = dynamic(() => import('../searchPage/ResultsSummary'));

const TeachersSearchResult = ({
  markers,
  language,
  location,
  sendEvent,
  bottomRef,
  seoActions,
  instrument,
  instruments,
  locationGeo,
  locationName,
  filterParams,
  currentMarker,
  teachersList = [],
  teachersRefs = [],
  filterButton = null,
  showMapButton = null,
  isMobileVersion = false,
  instrumentLocations,
  seoFilteredData,
  searchState,
  form
}) => {
  const [visibleCount, setVisibleCount] = useState(10);

  const listData = useMemo(() => {
    if (isMobileVersion && !currentMarker) return [];

    if (isMobileVersion && currentMarker) {
      const currentItem = markers.filter((item) => item?.id === currentMarker)[0];
      const currentIds = markers
        .filter((item) => {
          if (!currentItem) return false;

          return item?.latitude === currentItem?.latitude && item?.longitude === currentItem?.longitude;
        })
        .map((item) => item?.id);

      return teachersList.filter((item) => currentIds.includes(item?.id));
    }
    return teachersList?.slice(0, visibleCount);
  }, [teachersList, isMobileVersion, currentMarker, markers, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const teachersResult = (
    <ol>
      {listData.map((hit, index) => {
        return [
          <li
            className='mb-4'
            key={index}
            data-insights-object-id={hit?.objectID}
            data-insights-query-id={hit?.__queryID}
            data-insights-position={hit?.__position}
            ref={teachersRefs[hit.username || hit.user_id]}
            onClick={() => sendEvent && sendEvent('click', hit, hit?.profile_type == 'music_school' ? language == 'ch-en' ? hit?.mzo_region_full_name?.en : hit?.mzo_region_full_name?.de : hit?.username)}
            onAuxClick={() => sendEvent && sendEvent('click', hit, hit?.profile_type == 'music_school' ? language == 'ch-en' ? hit?.mzo_region_full_name?.en : hit?.mzo_region_full_name?.de : hit?.username)}>
            <CardComponent
              blok={hit}
              isCard={true}
              language={language}
              teacherIndex={index}
              instrument={instrument}
              seoActions={seoActions}
              locationName={locationName}
              filterParams={filterParams}
              instruments={instruments.hits}
              searchState={searchState}
            />
          </li>,
          (index === 2 || (index === teachersList.length - 1 && index < 2)) && !isMobileVersion ? (
            <li key={`${index}${index}`} className='mb-4'>
              <OurOffersComponent
                language={language}
                seoActions={seoActions}
                instrument={instrument}
                locationGeo={locationGeo}
              />
            </li>
          ) : (
            <li key={`${index}${index}`} />
          ),
        ];
      })}
    </ol>
  );

  if (isMobileVersion) {
    return (
      <div id='await-loading' className='teacher-search-result-mobile-list'>
        <div id='hits'>{teachersResult}</div>
      </div>
    );
  }

  return (
    <div>
      <div className='relative'>
        <div className='teacher-search-title-wrapper'>
          <TeachersCounter
            language={language}
            instrument={instrument}
            counter={teachersList.length}
            filteredSchools={teachersList}
          />
          <div className='teacher-search-filter-toggle'>{filterButton}</div>
          <div className='teacher-search-result-toggle'>{showMapButton}</div>
        </div>
        <div id='await-loading'>
          <div id='hits'>{teachersResult}</div>
        </div>
      </div>
      <div ref={bottomRef} />
      {visibleCount < teachersList?.length && (
        <div className='flex items-center justify-center w-full mt-6 mb-10 sm:mb-12 sm:mt-8'>
          <button
            aria-label='Load more teacher search result'
            onClick={handleLoadMore}
            className='search-notify-me-button'>
            {translateENtoDE('Show More', language)}
          </button>
        </div>
      )}
      <InstrumentSeoComponent seoFilteredData={seoFilteredData} instrument={instrument} locationName={locationName} />
      <InstrumentLocationList data={instrumentLocations} instrument={instrument} language={language} />
      <ResultsSummary
        location={location}
        language={language}
        seoActions={seoActions}
        instrument={instrument}
        instruments={instruments}
      />
    </div>
  );
};
export default TeachersSearchResult;
