/* eslint-disable @next/next/no-img-element */
import React from 'react';
import cx from 'classnames';
import ThumbsUpIcon from '../icons/ThumbsUp.svg';
import { translateENtoDE } from '../../functions/translator';
import Styles from '../../styles/card-component.module.scss';
import { getFilterParamsQuery } from '../../utils/getFilterParamsQuery';
import { useRouter } from 'next/router';
import { getSlugAfterDash } from '@/utils/schoolpage/getSlugAfterDash';

export const NthCard = ({ isEvta, data, language, instrument, locationGeo, locationName, filterParams }) => {
  const likes = data?.recommendations || 0;
  const firstLetter = String(data?.name?.trim()[0] || '').toUpperCase();
  const schoolLocation = data?.teacher?.locations?.studios?.address_list[0]
  const {query} = useRouter()
  const currentLocationName = getSlugAfterDash(query.location)
  const isProd = process.env.ALGOLIA_TEACHERINDEX === 'ms_teacher_list';
  const teacherLink = `${isEvta ? (isProd ? 'https://matchspace-music.ch' : 'https://website.matchspace.click') : ''}/${
    language === 'ch-fr' ? 'ch-de' : language
  }${data?.profile_type == "music_school" ? `/schools/mzo/${language == 'ch-en' ? data?.teacher?.mzo_region_full_name?.en.toLowerCase()
        .split(' ') 
        .join('-') : data?.teacher?.mzo_region_full_name?.de.toLowerCase()
        .split(' ') 
        .join('-')}?instrument=${instrument?.key}&location=${currentLocationName}&coords=${schoolLocation?.latitude},${
        schoolLocation?.longitude
      }` : `/teachers/${data.id}${instrument?.key ? `?instrument=${instrument?.key}` : ''}${
    location ? `&location=${encodeURIComponent(location)}` : ''
  }${locationGeo ? `&coords=${encodeURIComponent(locationGeo)}` : ''}${getFilterParamsQuery(filterParams)}`}`;

  return (
    <a className='outline-none popup-nth-card' target='_new' href={teacherLink}>
      <div className='p-[8px] card-content rounded-b-[8px]'>
        <div className='flex'>
          <div className='flex items-center justify-center w-[48px] h-[48px] rounded-full relative'>
            <div className='text-white font-[700] text-[14px] w-[48px] h-[48px]'>{firstLetter}</div>
            {data?.avatar_path ? <img
              alt='image'
              src={data?.avatar_path}
              className={cx('w-[48px] h-[48px] rounded-full absolute top-0 left-0 object-contain bg-white')}
            /> : <div className='w-[48px] h-[48px] rounded-full absolute top-0 left-0 bg-gray-300'></div>}
          </div>
          <div className={cx('ml-[12px]', { 'flex flex-col justify-center': !likes })}>
            <div className={cx('text-[17px] font-bold tx-primary', { 'mt-1 mb-[5px]': !!likes })}>{data?.name}</div>
            {!!likes && (
              <div className='flex items-center font-bold text-[13px] tx-secondary'>
                <ThumbsUpIcon className='mr-1' />
                {`${likes} ${translateENtoDE(likes > 1 ? 'Recommendations' : 'Recommendation', language)}`}
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

const PopupInfo = ({ isEvta, data, language, instrument, locationGeo, locationName, filterParams }) => {
  return (
     <div className={`${Styles.card_wrapper} w-60 min-h-full rounded-lg cursor-pointer bg-white outline-none`}>
    <NthCard
      data={data[0]}
      isEvta={isEvta}
      language={language}
      instrument={instrument}
      locationGeo={locationGeo}
      locationName={locationName}
      filterParams={filterParams}
    />
  </div>
  )
};
export default PopupInfo;
