import cx from 'classnames';
import { useCallback } from 'react';
import Filter from '../icons/Filter.svg';
import ShowList from '../icons/ShowList.svg';
import Location from '../icons/MapLocation.svg';

const ShowModalButton = ({ id, icon, label, onClick, extraClass, isActive, seoActions }) => {
  const buttonHandle = useCallback(() => {
    onClick();
    if (seoActions && seoActions?.showMapView && (icon === 'list' || icon === 'map')) {
      seoActions?.showMapView(icon);
    }
  }, [onClick, seoActions, icon]);

  return (
    <button
      type='button'
      onClick={buttonHandle}
      id={`offer-btn-${icon}-${id}`}
      className={cx(`toggle-map-button text-[15px] font-medium uppercase bg-primary text-white`, {
        [extraClass]: !!extraClass,
        'bottom-[20px]': icon === 'list',
        'teacher-search-filter-btn': icon === 'filter',
        'teacher-search-filter-btn-active': icon === 'filter' && isActive,
        'bottom-[40px]': typeof window !== 'undefined' ? navigator?.platform === 'iPhone' : false,
      })}>
      {icon === 'map' && <Location />}
      {icon === 'list' && <ShowList />}
      {icon === 'filter' && <Filter color={isActive ? '#ffffff' : '#21697C'} className='mr-1' />}
      <span className='ml-1'>{label}</span>
    </button>
  );
};

export default ShowModalButton;
