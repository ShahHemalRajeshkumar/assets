import { translateENtoDE } from 'functions/translator';
import TeacherStudioIcon from '../../../components/icons/TeacherStudio.svg';
import { locationLink } from '@/utils/schoolpage/redirectMZO';
import { useState } from 'react';
import useWindowSize from 'hooks/useWindowSize';

export function convertIntoLocation(item) {
  return `${item?.mzo_region_addresses[0]?.street} ${' '}
          ${item?.mzo_region_addresses[0]?.street_no}`;
}

export function TeachingLocation({title, filterLocation, language}) {
  const [isExpendedLocation, setIsExpendedLocation] = useState(false);
  const { width } = useWindowSize()
  const midpoint = Math.round(filterLocation?.length / 2);
  let col1 = filterLocation?.slice(0, midpoint);
  let col2 = filterLocation?.slice(midpoint);
  const onMobileSizeExpend = isExpendedLocation ? filterLocation : filterLocation?.slice(0, 4)
  const col1Data = isExpendedLocation ? col1 : col1?.slice(0, 2)
  const col2Data = isExpendedLocation ? col2 : col2?.slice(0, 2)

  return (
    <div className='border-b-[1px] border-[#E4E7EC] pb-[20px] mb-[20px]'>
      <h3 className={`font-semibold text-[14px] font-Roboto leading-[126%] text-[#000000DE]`}>
        {translateENtoDE(title, language)}
      </h3>
      {filterLocation && filterLocation.length ? (
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              {(width > 600 ? col1Data : onMobileSizeExpend).map((item, index) => (
                <div
                  key={index}
                  className='flex gap-[8px] mt-[8px] cursor-pointer'
                  onClick={() => window.open(locationLink(item, language), '_blank')}>
                  <TeacherStudioIcon className='w-4 h-4 overflow-visible' />
                  <div>
                    <h6 className='text-[15px] text-[#000000d7] leading-[148%] font-Roboto font-bold mb-[8px]'>{`${item?.mzo_region_addresses[0]?.city}`}</h6>
                    <p className='!text-[13px] !text-[#000000AD] !leading-[123%] !font-Roboto'>
                      {convertIntoLocation(item)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {width > 600 && <div>
              {col2Data.map((item, index) => (
                <div
                  key={index}
                  className='flex gap-[8px] mt-[8px] cursor-pointer'
                  onClick={() => window.open(locationLink(item, language), '_blank')}>
                  <TeacherStudioIcon className='w-4 h-4 overflow-visible' />
                  <div>
                    <h6 className='text-[15px] text-[#000000DE] leading-[148%] font-Roboto font-bold mb-[8px]'>{`${item?.mzo_region_addresses[0]?.city}`}</h6>
                    <p className='!text-[13px] !text-[#000000AD] !leading-[123%] !font-Roboto '>
                      {convertIntoLocation(item)}
                    </p>
                  </div>
                </div>
              ))}
            </div>}
          </div>
          {filterLocation && filterLocation?.length > 4 ? <div onClick={() => setIsExpendedLocation((prev) => !prev)} className='flex justify-start ml-1 text-[14px] font-Roboto font-semibold leading-[160%] text-[#21697C] cursor-pointer mt-[20px]'>{translateENtoDE(isExpendedLocation ? 'Show less' : 'Show more', language)}</div> : null}
        </div>
      ) : (
        <div className='text-sm  text-gray-600 text-center h-[70px] flex items-center justify-center '>
          <span>{translateENtoDE(`No Location Found`, language)}</span>
        </div>
      )}
    </div>
  );
}
