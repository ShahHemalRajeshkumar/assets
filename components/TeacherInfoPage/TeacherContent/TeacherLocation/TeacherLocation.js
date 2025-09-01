import mapboxgl from 'mapbox-gl';
import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapProvider } from 'react-map-gl';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { getPinFullAddress } from '../../../TeachersSearchMap/mapboxInfo';
import { translateENtoDE } from '../../../../functions/translator';
import TeacherStudioIcon from '../../../icons/TeacherStudio.svg';
import { getCityName } from '../TeacherContentHead/functions';
import LiveOnlineIcon from '../../../icons/LiveOnline.svg';
import HomeVisitIcon from '../../../icons/HomeVisit.svg';
import InfoIcon from '../../../icons/InfoIcon.svg';

const MapboxMap = dynamic(() => import('../../../TeachersSearchMap/MapboxMap'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const TeacherLocation = ({ language, locations = {}, isOrganization }) => {
  const mapRef = useRef(null);
  const [currentUUID, setCurrentUUID] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    latitude: 0,
    longitude: 0,
  });
  const studioLocations = useMemo(() => {
    const data = [];

    if (locations.studios?.checked) data.push(locations.studios?.address_list);
    if (locations.teacher_place?.checked) data.push({ ...locations?.teacher_place?.address, teacher_place: true });

    return data.flat();
  }, [locations]);

  const markers = useMemo(() => {
    const data = [];

    if (locations.student_place?.checked && !!locations?.student_place?.address_list?.length) {
      data.push(locations?.student_place?.address_list?.map((item) => ({ ...item, home_visit: true })));
    }

    return [...data, ...studioLocations].flat();
  }, [studioLocations, locations]);

  useEffect(() => {
    setMapCenter({
      latitude: markers[0]?.latitude,
      longitude: markers[0]?.longitude,
    });
  }, [markers]);

  const titleNameClasses = 'flex items-center text-16px font-bold';
  const homeVisitText = useMemo(() => {
    const uniqueCities = [
      ...new Set(locations?.student_place?.address_list.map((item) => getCityName(item?.full_address, item?.city))),
    ];

    let cities = '';
    const joinStr = language === 'ch-en' ? ' and ' : ' und ';

    if (uniqueCities.length <= 2) cities = uniqueCities.join(joinStr);
    if (uniqueCities.length > 2)
      cities = `${uniqueCities.slice(0, uniqueCities.length - 1).join(', ')}${joinStr}${uniqueCities.slice(
        uniqueCities.length - 1
      )}`;

    if (language === 'ch-en') {
      return `Home visits in ${cities}`;
    }

    return `Hausbesuche in ${cities} möglich`;
  }, [language, locations]);

  const isHomeVisit = useMemo(() => {
    const isChecked = !!locations?.student_place?.checked;
    const isLocation = !!locations?.student_place?.address_list?.length;

    return isChecked && isLocation;
  }, [locations]);

  const isStudios = useMemo(() => {
    const isChecked = !!locations?.studios?.checked;
    const isCheckedPlace = !!locations?.teacher_place?.checked;

    return Boolean(studioLocations.length && (isChecked || isCheckedPlace));
  }, [locations, studioLocations]);

  const getZoomLevel = useCallback(
    (latitude, longitude) => {
      if (mapRef?.current) {
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([longitude, latitude]);

        mapRef?.current?.fitBounds(bounds, { padding: 50, duration: 0, maxZoom: 17 });
      }
    },
    [mapRef]
  );

  return (
    <div className='teacher-content-location'>
      <div>
        {!isOrganization && !!locations?.online && (
          <h3 className={`${titleNameClasses} mb-4`}>
            <LiveOnlineIcon className='mr-2' />
            {translateENtoDE('Online lessons', language)}
          </h3>
        )}
        {!isOrganization && isHomeVisit && (
          <>
            <h3 className={`${titleNameClasses} mb-2`}>
              <HomeVisitIcon className='mr-2' />
              {translateENtoDE('Home visit', language)}
            </h3>
            <p className='ml-7 text-14px text-gray-600 mb-4'>{homeVisitText}</p>
          </>
        )}

        {isOrganization && (
          <>
            <h3 className={`${titleNameClasses} mb-2`}>
              <TeacherStudioIcon className='mr-2' />
              {translateENtoDE('Main building', language)}
            </h3>
            <p className='ml-7 text-14px text-gray-600 mb-4'>Bahnhofsrasse 36, 8620 Wetzikon</p>
          </>
        )}

        {!isOrganization && isStudios && (
          <>
            <h3 className={`${titleNameClasses} mb-2`}>
              <TeacherStudioIcon className='mr-2' />
              {translateENtoDE('Teacher’s studio', language)}
            </h3>
            <div className='ml-7'>
              {studioLocations.map((item, index) => (
                <p
                  key={index}
                  className='teacher-content-location-studio cursor-pointer flex leading-[24px]'
                  onClick={() => getZoomLevel(item?.latitude, item?.longitude)}>
                  {getPinFullAddress(item, !!item?.teacher_place)}

                  {!!item?.teacher_place ? (
                    <div className='ml-[6px] teacher-content-location-info'>
                      <div>
                        <InfoIcon />
                      </div>
                      <div className='teacher-content-location-info-content'>
                        {translateENtoDE(
                          'The exact address will be communicated to you before your first lesson',
                          language
                        )}
                      </div>
                    </div>
                  ) : null}
                </p>
              ))}
            </div>
          </>
        )}

        {isOrganization && (
          <>
            <h3 className={`${titleNameClasses} mb-2`}>
              <TeacherStudioIcon className='mr-2' />
              {translateENtoDE('Second building', language)}
            </h3>
            <p className='ml-7 text-14px text-gray-600 mb-4'>Bahnhofsrasse 36, 8620 Wetzikon</p>
          </>
        )}
      </div>
      {isHomeVisit || isStudios ? (
        <MapProvider>
          <MapboxMap
            id='locPins'
            zoomLevel={14}
            mapRef={mapRef}
            markers={markers}
            language={language}
            isTeacherInfo={true}
            currentUUID={currentUUID}
            currentMarker={currentMarker}
            setCurrentUUID={setCurrentUUID}
            setCurrentMarker={setCurrentMarker}
            latitude={mapCenter.latitude || 46.8024955829499}
            longitude={mapCenter.longitude || 8.23439191387853}
            styleContent={{
              height: '100%',
              minHeight: '350px',
              borderRadius: '12px',
            }}
          />
        </MapProvider>
      ) : (
        <div />
      )}
    </div>
  );
};

export default TeacherLocation;
