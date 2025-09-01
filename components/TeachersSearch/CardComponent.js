import cx from 'classnames';
import Image from 'next/image';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { getLocationString, getLocationTypes, getTeacherAges } from '../../utils/getTeacherGroupStrings';
import { getFilterParamsQuery } from '../../utils/getFilterParamsQuery';
import TeacherLocationIcon from '../icons/TeacherLocation.svg';
import Styles from '../../styles/card-component.module.scss';
import TeacherLabelWithLikes from './TeacherLabelWithLikes';
import ShowMoreText from '../TeacherInfoPage/ShowMoreText';
import TeacherAges from '../icons/TeacherAges.svg';
import TeacherMap from '../icons/TeacherMap.svg';
import EvtaImage from '../evta/evta.png';
import OrganizationCard from '../schoolComponents/OrganizationCard';

const CardComponent = ({
  blok,
  isInfo,
  isCard,
  isEvta,
  active,
  language,
  isMapList,
  seoActions,
  instrument,
  teacherIndex,
  filterParams,
  locationName,
  searchState,
}) => {
  const isProd = process.env.ALGOLIA_TEACHERINDEX === 'ms_teacher_list';
  const _language = language === 'ch-fr' ? 'ch-de' : language;
  const linkClasses = cx(`${Styles.teacher_card} teacher-card-item select-none`, {
    'outline-primary': active,
    'teacher-card-new': isCard,
    'teacher-card-evta': isEvta,
  });

  const instruments = useMemo(() => blok?.instruments || [], [blok]);
  const instrumentsRow = useMemo(
    () => (
      <div className={`${Styles.card_instruments_wrapper} ms_instruments`}>
        {instruments.slice(0, 3).map((item, index) => (
          <div key={index} className={`ms_instruments-${String(item?.key).toLowerCase().replace(' ', '_')} ml-2`} />
        ))}
      </div>
    ),
    [instruments]
  );

  const isOnline = !!blok?.locations?.online;
  const ageGroups = Object.keys(blok?.age_taught || {}).filter((item) => !!blok?.age_taught[item]);
  const locationString = getLocationString(blok, instrument, language, locationName, isOnline);
  const locationTypes = getLocationTypes(blok?.locations, language) || '';
  const teacherAges = getTeacherAges(ageGroups, language);
  const teacherName = `${blok?.name || ''}`;
  const teacherLink = `${
    isEvta ? (isProd ? 'https://matchspace-music.ch' : 'https://website.matchspace.click') : ''
  }/${_language}/teachers/${blok.username}${
    instrument?.key ? `?instrument=${instrument?.key}` : ''
  }${getFilterParamsQuery(filterParams)}`;

  const teacherHandle = useCallback(() => {
    if (window) window?.open(teacherLink, '_blank');

    if (seoActions?.selectTeacher) {
      seoActions?.selectTeacher(blok, teacherIndex);
    }
  }, [teacherLink, seoActions, blok, teacherIndex]);

  const split = teacherName?.trim()?.split(' ');
  const initials = `${(split[0] || ' ')[0]}${(split[1] || ' ')[0]}`.trim();
  const initialsClasses = `
    rounded-full flex text-[#000000de] font-[600] items-center justify-center 
    bg-slate-400 text-[18px] uppercase absolute top-0 left-0
  `;

  const [counter, setCounter] = useState(0);
  const [isImageError, setIsImageError] = useState(false);

  const onError = useCallback(() => {
    setIsImageError(true);
    setCounter((value) => value + 1);
  }, []);

  useEffect(() => {
    if (isImageError && counter === 1) {
      setIsImageError(false);
      setTimeout(() => setIsImageError(false), 1000);
    }
  }, [counter, isImageError]);

  const showMoreText = `${blok?.about_me}`.replace(/[\r\n]+/g, ' ');
  const rowClass = 'flex items-center font-[400] leading-[14px] text-14px tx-primary';
  const isEvtaBlock = !!blok?.association_list?.filter((item) => item?.short_name?.en === 'EVTA')?.length;

  if (blok?.profile_type === 'music_school') {
    return (
      <OrganizationCard
        item={blok}
        instrument={instrument}
        locationName={locationName}
        language={language}
        currentSearchState={searchState}
      />
    );
  }

  return (
    <div onClick={teacherHandle} className={`${linkClasses}`} id={`teacher-${blok.uuid}-${teacherIndex}`}>
      <div className={cx(`${Styles.teacher_card_image} relative`)}>
        {!!blok?.avatar_path && !isImageError && (
          <Image
            alt=''
            width={96}
            height={96}
            layout='fixed'
            onError={onError}
            src={blok.avatar_path}
            className={cx('rounded-full teacher-card-img')}
          />
        )}
        {(isEvta || isEvtaBlock) && (
          <div className='absolute pl-[18px]'>
            <Image width={60} height={16} src={EvtaImage} alt='' />
          </div>
        )}
        {!!isImageError && <div className={cx(`${initialsClasses} h-[96px] w-[96px]`)}>{initials}</div>}
      </div>
      <div>
        <div className={`${Styles.card_instruments} mb-1`}>
          <div className='flex items-center'>
            {blok?.avatar_path && (
              <div className={`${Styles.teacher_card_image_small} relative mr-2`}>
                <Image
                  alt=''
                  width={56}
                  height={56}
                  layout='fixed'
                  onError={onError}
                  src={blok.avatar_path}
                  className='rounded-full teacher-card-img'
                />
                {isImageError && (
                  <div className={cx(`${initialsClasses} text-[16px] h-[56px] w-[56px]`)}>{initials}</div>
                )}
              </div>
            )}
            <h2 className='text-16px leading-[22px] sm:text-22px sm:leading-26px font-bold mb-1 tx-primary'>
              {teacherName}
            </h2>
          </div>
          <div className='flex items-center'>
            {instrumentsRow}
            {instruments.length > 3 && (
              <div className='text-14px ml-3 text-primary'>{`+${instruments.length - 3}`}</div>
            )}
          </div>
        </div>
        <TeacherLabelWithLikes
          isInfo={isInfo}
          // isCard={true}
          language={language}
          likes={blok?.recommendations}
          teacherType={blok?.profile_type}
        />
        {!!locationString && !isMapList && (
          <div className={`${rowClass} mb-[8px]`}>
            <TeacherMap className='mr-2 min-w-[24px]' />
            {locationString}
          </div>
        )}
        <div className={`${rowClass} mb-[8px]`}>
          <TeacherLocationIcon className='mr-2 min-w-[24px]' />
          <span className='first-letter:uppercase'>{locationTypes}</span>
        </div>
        <div className={`${rowClass} mb-[12px]`}>
          <TeacherAges className='mr-2 min-w-[24px]' />
          {teacherAges}
        </div>
        <div
          className='card-component-text-wrapper'
          onClick={(event) => {
            event?.stopPropagation();
            event?.preventDefault();
          }}>
          <ShowMoreText
            isDisabled={true}
            language={language}
            text={showMoreText}
            onClick={teacherHandle}
            maxLength={isMapList ? 120 : 200}
          />
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
