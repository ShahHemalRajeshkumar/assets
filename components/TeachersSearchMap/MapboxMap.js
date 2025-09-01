import { isEmpty } from 'ramda';
import mapboxgl from 'mapbox-gl';
import Supercluster from 'supercluster';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Map, Marker, useMap, NavigationControl, ScaleControl } from 'react-map-gl';
import { FlyTo, sortAndGroup, MAP_STYLE, MAPBOX_ACCESS_TOKEN, getCurrentMarkerID } from './mapboxInfo';
import MapboxMobileTeacherList from './MapboxMobileTeacherList';
import MapboxMapPopups from './MapboxMapPopups';
import MapboxPinGroup from './MapboxPinGroup';
import { sortedMarkers } from './functions';

const MapboxMap = ({
  id,
  mapRef,
  isEvta,
  markers,
  language,
  latitude,
  longitude,
  zoomLevel,
  seoActions,
  instrument,
  instruments,
  currentUUID,
  isIpAddress,
  locationName,
  filterParams,
  styleContent,
  isSearchPage,
  currentMarker,
  isTeacherInfo,
  openListPopup,
  isSwitzerland,
  onSearchInArea,
  setCurrentUUID,
  isMobileVersion,
  setMobileStatus,
  isInstrumentPage,
  setCurrentMarker,
  isFitBounds = true,
  isSearchArea = true,
}) => {
  const maps = useMap();
  const [popupInfo, setPopupInfo] = useState(null);
  const [mobileMarkers, setMobileMarkers] = useState([]);
  const [currentCluster, setCurrentCluster] = useState(null);
  const [isOpenPinSlider, setIsOpenPinSlider] = useState(false);
  const [rendered, setRendered] = useState(false);

  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom: isEvta ? 6 : zoomLevel < 9 ? (isMobileVersion ? 11 : 10) : zoomLevel,
  });
  const cluster = useMemo(() => {
    if (!markers?.length || !isSearchPage) return null;
    const supercluster = new Supercluster({ radius: 50, maxZoom: 11 });
    supercluster.load(
      markers.map((item) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [item?.longitude, item?.latitude] },
        properties: item,
      }))
    );
    return supercluster;
  }, [markers, isSearchPage]);
  const updatePopupInfo = useCallback(
    (data) => {
      const filterData = data.map((item) =>
        item?.profile_type === 'music_school'
          ? {
              ...item,
              id: item?.teacher?.mzo_region_full_name?.de || item?.teacher?.user_id,
              name: language === 'ch-en' ? item?.teacher?.mzo_region_full_name?.en : item?.teacher?.mzo_region_full_name?.de,
              avatar_path: item?.teacher?.avatar_path,
            }
          : item
      );

      setPopupInfo(filterData);
      if (isMobileVersion) setMobileMarkers(filterData);
    },
    [isMobileVersion, language]
  );
  const mapClickHandle = useCallback(() => {
    setPopupInfo(null);
    setCurrentUUID?.(null);
    setCurrentMarker?.(null);
    setCurrentCluster(null);
  }, [setCurrentUUID, setCurrentMarker]);
  const handleOpen = useCallback(() => setMobileStatus?.(true), [setMobileStatus]);
  const handleClose = useCallback(() => {
    setPopupInfo(null);
    setCurrentUUID?.(null);
    setCurrentMarker?.(null);
    setMobileStatus?.(false);
  }, [setMobileStatus, setCurrentUUID, setCurrentMarker]);
  useEffect(() => {
    if (popupInfo && !isEmpty(popupInfo)) {
      const sorted = sortedMarkers(popupInfo);
      const firstID = getCurrentMarkerID(sorted[0], true);
      setCurrentUUID?.(firstID);
      setCurrentMarker?.(getCurrentMarkerID(sorted[0]));
      setMobileStatus?.(true);
    }
  }, [popupInfo, setCurrentMarker, setCurrentUUID, setMobileStatus]);
  const closeMobileList = useCallback(() => {
    setCurrentMarker?.(null);
    setCurrentUUID?.(null);
    setMobileMarkers([]);
  }, [setCurrentMarker, setCurrentUUID]);
  const getZoomLevel = useCallback(() => {
    if (mapRef?.current && !rendered && isFitBounds && markers?.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach((item) => bounds.extend([item?.longitude, item?.latitude]));
      mapRef.current.fitBounds(bounds, { padding: 50, duration: 0, zoomLevel: 11 });
      setRendered(true);
    }
  }, [mapRef, markers, rendered, isFitBounds]);

  const handleMove = useCallback((evt) => setViewState(evt.viewState), []);
  useEffect(() => {
    const zoom =
      isEvta || isInstrumentPage ? 6 : isSwitzerland ? 8 : zoomLevel < 9 ? (isMobileVersion ? 11 : 10) : zoomLevel;
    setViewState((prev) => ({ ...prev, zoom }));
  }, [zoomLevel, isEvta, isSwitzerland, isInstrumentPage, isMobileVersion]);
  useEffect(() => {
    if (isIpAddress && maps[id] && isMobileVersion) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach((item) => bounds.extend([item?.longitude, item?.latitude]));
      maps[id]?.fitBounds(bounds, { padding: 50, duration: 0 });
    }
  }, [maps, id, isIpAddress, markers, isMobileVersion]);
  const zoomToCluster = useCallback((longitude, latitude) => {
    setViewState((prev) => ({
      ...prev,
      latitude,
      longitude,
      zoom: prev.zoom + 2,
      transitionDuration: 500,
    }));
  }, []);
  const markersList = useMemo(() => {
    if (!markers?.length) return null;

    if (isSearchPage && cluster) {
      return cluster.getClusters([-180, -90, 180, 90], Math.floor(viewState.zoom)).map((c, idx) => {
        const [longitude, latitude] = c.geometry.coordinates;
        const { uuid, cluster: isCluster, point_count: pointCount } = c.properties;

        if (isCluster) {
          return (
            <Marker key={`cluster-${idx}`} latitude={latitude} longitude={longitude}>
              <div className="cluster-marker" onClick={() => zoomToCluster(longitude, latitude)}>
                {pointCount}
              </div>
            </Marker>
          );
        }
        const marker = markers.filter((m) => m?.latitude === latitude && m?.longitude === longitude);
        return (
          <Marker key={uuid} latitude={latitude} longitude={longitude}>
            <MapboxPinGroup
              mapRef={mapRef}
              markers={marker}
              clusterID={uuid}
              language={language}
              currentUUID={currentUUID}
              setViewState={setViewState}
              filterParams={filterParams}
              isTeacherInfo={isTeacherInfo}
              currentMarker={currentMarker}
              openListPopup={openListPopup}
              currentCluster={currentCluster}
              handlePinClick={updatePopupInfo}
              isMobileVersion={isMobileVersion}
              setCurrentCluster={setCurrentCluster}
              setIsOpenPinSlider={setIsOpenPinSlider}
            />
          </Marker>
        );
      });
    }
    return sortAndGroup(markers).map((marker, index) => (
      <Marker key={`marker-${index}`} longitude={marker[0].longitude} latitude={marker[0].latitude}>
        <MapboxPinGroup
          mapRef={mapRef}
          markers={marker}
          language={language}
          currentUUID={currentUUID}
          filterParams={filterParams}
          setViewState={setViewState}
          openListPopup={openListPopup}
          isTeacherInfo={isTeacherInfo}
          currentMarker={currentMarker}
          handlePinClick={updatePopupInfo}
          isMobileVersion={isMobileVersion}
          setIsOpenPinSlider={setIsOpenPinSlider}
        />
      </Marker>
    ));
  }, [
    cluster,
    markers,
    viewState.zoom,
    language,
    currentUUID,
    filterParams,
    isSearchPage,
    isTeacherInfo,
    currentMarker,
    zoomToCluster,
    openListPopup,
    currentCluster,
    updatePopupInfo,
    isMobileVersion,
    setCurrentCluster,
    setIsOpenPinSlider,
    mapRef,
  ]);

  if (!latitude || !longitude) return null;

  const mapStyle = styleContent || { height: 550, borderRadius: '12px' };
  return (
    <Map
      id={id}
      reuseMaps
      ref={mapRef}
      style={mapStyle}
      onMove={handleMove}
      mapStyle={MAP_STYLE}
      zoom={viewState.zoom}
      onRender={getZoomLevel}
      latitude={viewState.latitude}
      longitude={viewState.longitude}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      onClick={(event) => event?.originalEvent?.target?.tagName === 'CANVAS' && mapClickHandle()}
    >
      <ScaleControl />
      <NavigationControl />
      <FlyTo lat={latitude} lng={longitude} />
      {markersList}
      <MapboxMapPopups
        markers={markers}
        language={language}
        onOpen={handleOpen}
        popupInfo={popupInfo}
        onClose={handleClose}
        instrument={instrument}
        currentUUID={currentUUID}
        filterParams={filterParams}
        currentMarker={currentMarker}
        isTeacherInfo={isTeacherInfo}
        isMobileVersion={isMobileVersion}
        isOpenPinSlider={isOpenPinSlider}
      />
      {!!isMobileVersion && (
        <MapboxMobileTeacherList
          language={language}
          seoActions={seoActions}
          instrument={instrument}
          instruments={instruments}
          onClose={closeMobileList}
          locationName={locationName}
          filterParams={filterParams}
          mobileMarkers={mobileMarkers}
        />
      )}
    </Map>
  );
};
MapboxMap.displayName = 'MapboxMap';
export default MapboxMap;