import cx from 'classnames';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import MapboxPinGroupSlider from './MapboxPinGroupSlider';
import { getCurrentMarkerID } from './mapboxInfo';
import MapboxPin from './MapboxPin';

const MapboxPinGroup = ({
  isEvta,
  mapRef,
  language,
  clusterID,
  markers = [],
  setViewState,
  openListPopup,
  currentMarker,
  isTeacherInfo,
  currentCluster,
  handlePinClick,
  isMobileVersion,
  setCurrentCluster,
  setIsOpenPinSlider,
}) => {
  const [showPins, setShowPins] = useState(false);

  const isVisible = useMemo(() => !!(currentCluster && clusterID === currentCluster), [clusterID, currentCluster]);

  const hideMarkers = useCallback(() => {
    if (isVisible && setCurrentCluster) setCurrentCluster(null);
    if (setIsOpenPinSlider) {
      setTimeout(() => setIsOpenPinSlider(false), 500);
    }
  }, [isVisible, setCurrentCluster, setIsOpenPinSlider]);

  const groupHandle = useCallback(() => {
    if (setCurrentCluster) {
      setCurrentCluster(() => (clusterID === currentCluster ? null : clusterID));
    } else {
      setShowPins(true);
    }

    handlePinClick(markers);

    if (markers?.length && !isMobileVersion) {
      setViewState({
        latitude: +markers[0]?.latitude,
        longitude: +markers[0]?.longitude,
        zoom: mapRef?.current?.getZoom(),
      });
    }
  }, [mapRef, markers, setViewState, clusterID, handlePinClick, currentCluster, setCurrentCluster, isMobileVersion]);

  useEffect(() => {
    if (markers.length) {
      const isActive = markers.map((item) => item.id).includes(currentMarker);
      if (!isActive) setShowPins(false);
    }
  }, [markers, currentMarker]);

  if (markers.length === 1) {
    return (
      <MapboxPin
        isTeacherInfo={isTeacherInfo}
        isHomeVisit={markers[0]?.home_visit}
        onClick={() => {
          setCurrentCluster && setCurrentCluster(null);
          handlePinClick(markers);
        }}
        active={currentMarker === getCurrentMarkerID(markers[0])}
      />
    );
  }
  return (
    <>
      {markers.length > 1 && (
        <div
          onClick={() => {
            if (isMobileVersion) {
              handlePinClick(markers);
            } else {
              groupHandle();
            }
          }}
          className={cx('teacher-marker-group', {
            'teacher-marker-group-active': currentMarker === getCurrentMarkerID(markers[0]),
          })}>
          {markers.length}
        </div>
      )}
      {isVisible && !isMobileVersion && (
        <MapboxPinGroupSlider
          isEvta={isEvta}
          markers={markers}
          language={language}
          hideMarkers={hideMarkers}
          openListPopup={openListPopup}
          handlePinClick={handlePinClick}
          setIsOpenPinSlider={setIsOpenPinSlider}
        />
      )}
    </>
  );
};

export default MapboxPinGroup;
