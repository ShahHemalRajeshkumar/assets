import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapProvider } from 'react-map-gl';
import React, { useRef, useMemo, useState, useCallback } from 'react';
import CardComponent from '../TeachersSearch/CardComponent';
import TeacherPopup from '../TeacherInfoPage/TeacherPopup';

const MapboxMap = dynamic(() => import('../TeachersSearchMap/MapboxMap'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const EvtaMap = ({ language, instrument = {}, teachers = [] }) => {
  const mapRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [popupList, setPopupList] = useState({});
  const [currentUUID, setCurrentUUID] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);

  const openListPopup = useCallback((arr = []) => {
    setIsOpen(true);
    setPopupList(arr);
  }, []);

  const closeListPopup = useCallback(() => {
    setIsOpen(false);
    setPopupList([]);
  }, []);

  const markers = useMemo(
    () =>
      teachers
        ?.filter(
          (item) =>
            !!item?.association_list?.length &&
            !!item?.association_list?.filter((name) => name?.short_name?.en?.toLowerCase()?.includes('evta'))?.length
        )
        ?.map((item) => {
          const locations = item?.locations;
          const studios = locations?.studios?.checked ? locations?.studios?.address_list : [];
          const teacher = locations?.teacher_place?.checked ? locations?.teacher_place?.address : [];
          const place = locations?.student_place?.checked ? locations?.student_place?.address_list : [];

          const allLocations = [...studios, teacher, ...place]
            .flat()
            .filter(
              (item) =>
                !!item &&
                !!item?.latitude &&
                !!item?.longitude &&
                !(item.latitude > 90 || item.latitude < -90 || item.longitude > 90 || item.longitude < -90)
            )
            .map((item) => `${item?.latitude}-${item?.longitude}`);

          return {
            ...item,
            _geoloc: item?._geoloc.filter((geo) => !!allLocations.includes(`${geo?.lat}-${geo?.lng}`)),
          };
        })
        .map((item) => {
          const geoStrings = item._geoloc.filter((geo) => !!geo?.lat).map((geo) => Object.values(geo).join(','));
          const uniqueGeo = [...new Set(geoStrings)].map((geo) => geo.split(','));

          return uniqueGeo.map((geoItem) => ({
            id: item.username || item.user_id,
            name: item.name,
            latitude: geoItem[0],
            longitude: geoItem[1],
            avatar_path: item.avatar_path,
            recommendations: item.recommendations,
            teacher: item,
            profile_type: item?.profile_type,
            uuid: uuidv4(),
          }));
        })
        .flat(),
    [teachers]
  );

  const styleContent = {
    width: '100%',
    height: '500px',
    borderRadius: '0px',
  };

  return (
    <div className='evta-page-content'>
      <style>{`#__next { background: transparent }`}</style>
      {!!isOpen && !!popupList?.data?.length && (
        <TeacherPopup
          isMobileVersion={true}
          isFullViewModal={true}
          name='map-teachers-list'
          onClose={closeListPopup}
          title={`${popupList?.data?.length} ${language === 'ch-en' ? 'Teachers' : 'Lehrpersonen'}`}>
          <div className='pr-[5px]'>
            <ol className='teachers-list-ol visible-scrollbar'>
              {popupList?.data?.map((item, index) => (
                <li key={`${index}`} className='mb-[16px]'>
                  <CardComponent
                    isInfo={true}
                    active={false}
                    seoActions={{}}
                    language={language}
                    teacherIndex={index}
                    blok={item?.teacher}
                    instrument={instrument}
                    filterParams={popupList?.filterParams || {}}
                  />
                </li>
              ))}
            </ol>
          </div>
        </TeacherPopup>
      )}
      <div className='evta-map'>
        <MapProvider>
          <MapboxMap
            isSearchPage
            isEvta={true}
            id='desktopMap'
            mapRef={mapRef}
            zoomLevel={6.5}
            markers={markers}
            isFitBounds={false}
            language={language}
            isSearchArea={false}
            instrument={instrument}
            currentUUID={currentUUID}
            styleContent={styleContent}
            latitude={46.8024955829499}
            longitude={8.23439191387853}
            currentMarker={currentMarker}
            openListPopup={openListPopup}
            setCurrentUUID={setCurrentUUID}
            setCurrentMarker={setCurrentMarker}
          />
        </MapProvider>
      </div>
    </div>
  );
};

export default EvtaMap;
