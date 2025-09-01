import React from 'react';
import SchoolMapBox from './SchoolMapBox';
import TeacherStudioIcon from '../../icons/TeacherStudio.svg';
import { translateENtoDE } from 'functions/translator';

function SchoolMapBoxWrapper({ language, locations, query }) {
  const titleNameClasses = 'flex items-center text-16px font-bold';
  const searchParamLocation = query?.coords?.split(',')
  return (
    <div className='teacher-content-location overflow-hidden'>
      <div>
        {locations?.length > 0 ? (
          locations.map((location, index) => (
            <div className='' key={locations?.id ?? index}>
              <h3 className={`${titleNameClasses} mb-2`}>
                <TeacherStudioIcon className='mr-2' />
                {translateENtoDE('Main building', language)}
              </h3>
              <p className='ml-[31.1px] text-14px text-gray-600 mb-4'>{location.full_address}</p>
            </div>
          ))
        ) : (
          <div className='text-14px text-gray-600 leading-115 font-Roboto font-medium mt-4'>
            {translateENtoDE('No other location found', language)}
          </div>
        )}
      </div>
      {locations && locations.length > 0 ? (
        <div className='relative rounded-xl' style={{clipPath: 'inset(0 round 12px)'}}>
          <SchoolMapBox
            markers={locations}
            language={language}
            styleContent={{
              height: '100%',
              minHeight: '350px',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
            latitude={searchParamLocation && searchParamLocation[0] ? parseFloat(searchParamLocation[0]) : locations[0]?.latitude || 47.4979}
            longitude={searchParamLocation && searchParamLocation[1] ? parseFloat(searchParamLocation[1]) : locations[0]?.longitude || 8.7137}
          />
        </div>
      ) : (
        <div 
          style={{
            height: '350px',
            borderRadius: '12px',
          }}
          className="flex items-center justify-center bg-gray-100 border border-gray-300"
        >
          <div className="text-center p-4">
            <p className="text-gray-600 mb-2">{translateENtoDE('No location data available', language)}</p>
            <p className="text-sm text-gray-500">{translateENtoDE('Please check back later', language)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SchoolMapBoxWrapper;
