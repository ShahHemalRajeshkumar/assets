import cx from 'classnames';
import React, { useRef, useMemo, useEffect } from 'react';
import CardComponent from '../TeachersSearch/CardComponent';
import useOutsideClick from '../../hooks/useOutsideClick';
import { sortedMarkers } from './functions';
import OrganizationCard from '../schoolComponents/OrganizationCard';

const MapboxMobileTeacherList = ({
  isEvta,
  onClose,
  language,
  location,
  seoActions,
  instrument,
  locationGeo,
  instruments,
  filterParams,
  locationName,
  mobileMarkers = [],
}) => {
  const containerRef = useRef(null);
  useOutsideClick(containerRef, onClose);

  useEffect(() => {
    if (!!mobileMarkers.length && containerRef?.current) {
      if (containerRef?.current?.scrollLeft) {
        containerRef.current.scrollLeft = 0;
      }
    }
  }, [mobileMarkers, containerRef]);

  const sorted = useMemo(() => sortedMarkers(mobileMarkers), [mobileMarkers]);

  if (!mobileMarkers.length) return <div ref={containerRef} />;

  return (
    <div ref={containerRef} className={cx('map-mobile-teacher-list')}>
      {sorted?.map((item, index) => {
        if (item?.profile_type == 'music_school') {
          return (
          <OrganizationCard item={item?.teacher} instrument={instrument} locationName={locationName} language={language} />
          );
        } else { 
          return (
            <CardComponent
              isCard={true}
              active={false}
              key={item?.id}
              isEvta={isEvta}
              isMapList={true}
              location={location}
              language={language}
              blok={item?.teacher}
              teacherIndex={index}
              seoActions={seoActions}
              instrument={instrument}
              locationGeo={locationGeo}
              instruments={instruments}
              locationName={locationName}
              filterParams={filterParams}
            />
          );
        }
      })}
    </div>
  );
};

export default MapboxMobileTeacherList;
