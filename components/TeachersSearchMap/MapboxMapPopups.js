import React from 'react';
import cx from 'classnames';
import { Popup } from 'react-map-gl';
import TeacherPopupInfo from './TeacherPopupInfo';
import { sortAndGroup } from './mapboxInfo';
import PopupInfo from './PopupInfo';

const MapboxMapPopups = ({
  isEvta,
  onOpen,
  onClose,
  markers,
  language,
  popupInfo,
  instrument,
  currentUUID,
  locationGeo,
  locationName,
  filterParams,
  currentMarker,
  isTeacherInfo,
  isMobileVersion,
  isOpenPinSlider,
}) => {
  if (isTeacherInfo && popupInfo) {
    return (
      <Popup
        onOpen={onOpen}
        onClose={onClose}
        closeButton={false}
        closeOnClick={false}
        latitude={popupInfo[0].latitude}
        longitude={popupInfo[0].longitude}>
        <TeacherPopupInfo
          isEvta={isEvta}
          data={popupInfo}
          onClose={onClose}
          language={language}
          locationGeo={locationGeo}
          locationName={locationName}
        />
      </Popup>
    );
  }

  if (!isTeacherInfo && currentMarker && currentUUID && popupInfo && !isOpenPinSlider) {
    const groups = sortAndGroup(markers || [])
      .filter((item) => item?.length > 1)
      .flat()
      .map((item) => `${item?.longitude}-${item?.latitude}`);
    return (
      <>
        {markers.map((item) => {
          if (item?.id !== currentMarker || item?.uuid !== currentUUID || isMobileVersion) return null;
          return (
            <Popup
              key={item}
              onOpen={onOpen}
              closeButton={false}
              closeOnClick={false}
              latitude={item.latitude}
              longitude={item.longitude}
              className={cx({ 'cluster-popup': groups.includes(`${item?.longitude}-${item?.latitude}`) })}>
              {!isMobileVersion && (
                <PopupInfo
                  data={[item]}
                  isEvta={isEvta}
                  language={language}
                  instrument={instrument}
                  locationGeo={locationGeo}
                  locationName={locationName}
                  filterParams={filterParams}
                />
              )}
            </Popup>
          );
        })}
      </>
    );
  }

  return null;
};

export default MapboxMapPopups;
