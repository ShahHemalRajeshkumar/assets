import React from 'react';
import cx from 'classnames';
import { translateENtoDE } from '../../functions/translator';
import Styles from '../../styles/card-component.module.scss';
import { getPinFullAddress } from './mapboxInfo';

const TeacherPopupInfo = ({ data, language, onClose }) => {
  const coordinates = `${data[0]?.latitude},${data[0]?.longitude}`;
  const directionLink = `https://www.google.com/maps/dir//${coordinates}/@${coordinates}/data=!4m2!4m1!3e0`;

  const wrapperClasses = cx(
    `${Styles.card_wrapper} min-w-fit w-full min-h-full rounded-lg cursor-pointer bg-white outline-none`,
    {
      'max-w-[240px]': !data[0]?.home_visit,
      'max-w-[260px]': !!data[0]?.home_visit,
    }
  );

  if (data[0]?.home_visit) {
    const name = data[0]?.full_address || data[0]?.city || data[0]?.country_name;
    const text = language === 'ch-en' ? `Home visits in ${name}` : `Hausbesuche in ${name}`; // möglich

    return (
      <div className={wrapperClasses}>
        <div className='p-2 card-content rounded-b-md'>
          <div className='flex items-center justify-between'>
            <p className='text-14px'>{text}</p>
            <div className='ml-2 mt-[3px] transform scale-75' onClick={onClose}>
              <i className='material-icons-outlined text-22px cursor-pointer'>{'close'}</i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <div className='p-2 card-content rounded-b-md'>
        <div className='flex items-start justify-between'>
          <p className='text-14px mb-2'>{getPinFullAddress(data[0], !!data[0]?.teacher_place)}</p>
          <div className='ml-2 transform scale-75' onClick={onClose}>
            <i className='material-icons-outlined text-22px cursor-pointer'>{'close'}</i>
          </div>
        </div>
        {false && (
          <a
            href={directionLink}
            target='_blank'
            className='text-14px font-bold text-primary cursor-pointer'
            rel='noreferrer'>
            {translateENtoDE('Get directions', language)}
          </a>
        )}
      </div>
    </div>
  );
};

export default TeacherPopupInfo;
